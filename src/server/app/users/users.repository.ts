import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
  ConflictException,
} from "@nestjs/common"
import { InjectModel } from "@nestjs/sequelize"
import { User } from "./user.entity"

@Injectable()
export class UsersRepository {
  constructor(
    @InjectModel(User)
    private userModel: User,
  ) {}

  async save(user: User): Promise<User> {
    return user.save()
  }

  async registerUser(user: User): Promise<User> {
    try {
      return await user.save()
    } catch (error) {
      if (error.code === "23505") {
        throw new ConflictException(`User with email ${user.email} already exists`)
      } else {
        console.error(`Could not register user ${user.email}`, error)
        throw new InternalServerErrorException(`Could not register user ${user.email}`)
      }
    }
  }

  async findByEmail(email: string): Promise<User> {
    const user = await User.findOne({ where: { email: email.toLowerCase() } })
    if (!user) {
      throw new NotFoundException("No user record found for given email address")
    }
    return user
  }

  async findById(id: string): Promise<User> {
    const user = await User.findByPk(id)
    if (!user) {
      throw new NotFoundException(`No user record found for given user ID ${id}`)
    }
    return user
  }
}
