import { RegisterUserDto } from "@common/session/dto/session-data.dto"
import { RegisterAccountReqDetails } from "@common/session/session.interface"
import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { User } from "./user.entity"
import { UserRepository } from "./user.repository"

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserRepository)
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
    return this.userRepository.findById(userId)
  }

  async saveUser(user: User): Promise<User> {
    return this.userRepository.save(user)
  }
}
