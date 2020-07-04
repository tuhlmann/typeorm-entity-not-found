import { RegisterUserDto } from "@common/session/dto/session-data.dto"
import { RegisterAccountReqDetails } from "@common/session/session.interface"
import { Injectable } from "@nestjs/common"
import { InjectModel, InjectConnection } from "@nestjs/sequelize"
import { User } from "./user.entity"
import { UsersRepository } from "./users.repository"
import { Sequelize } from "sequelize"
import { Umzug, SequelizeStorage } from "umzug"

@Injectable()
export class UsersService {
  constructor(
    private readonly userRepository: UsersRepository,
    @InjectConnection() private readonly sequelize: Sequelize,
  ) {
    const umzug = new Umzug({
      storage: new SequelizeStorage({ sequelize }),
      migrations: {
        path: "./migrations",
        params: [sequelize.getQueryInterface()],
      },
    })
    umzug.up().then(r => {
      console.log(r)
    })

    this.findUserByName("hallo").then(r => console.log(r))
  }

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

  async findUserByName(name: string): Promise<User | null> {
    return User.findOne({ where: { name } })
  }

  async saveUser(user: User): Promise<User> {
    return this.userRepository.save(user)
  }
}
