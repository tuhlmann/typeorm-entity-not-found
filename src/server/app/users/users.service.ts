import { RegisterUserDto } from "@common/session/dto/session-data.dto"
import { RegisterAccountReqDetails } from "@common/session/session.interface"
import { Injectable } from "@nestjs/common"
import { User } from "./user.entity"
import { UserRepository } from "./user.repository"
import { InjectRepository } from "nestjs-mikro-orm"

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: UserRepository,
  ) {}

  /**
   * Create a fresh User instance
   */
  createInstance(registerUserDto: RegisterUserDto, reqDetails?: RegisterAccountReqDetails): User {
    const { email, name } = registerUserDto

    const user = new User()
    user.email = email.toLowerCase()
    user.name = name
    return user
  }

  async findUserById(userId: string): Promise<User> {
    return this.userRepository.findOneOrFail({ id: userId }) //findById(userId)
  }

  async saveUser(user: User): Promise<User> {
    console.log("USER: ", user)

    // persist mutates the user instance (which is now part of identity map)
    await this.userRepository.persist(user, true)
    return user
  }
}
