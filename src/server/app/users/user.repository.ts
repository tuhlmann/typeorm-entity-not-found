import { ConflictException, InternalServerErrorException, NotFoundException } from "@nestjs/common"
import { User } from "./user.entity"
import { EntityRepository, Repository } from "mikro-orm"

@Repository(User)
export class UserRepository extends EntityRepository<User> {
  async registerUser(user: User): Promise<User> {
    try {
      return user.init(true)
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
    const user = await this.findOne({ email: email.toLowerCase() })
    if (!user) {
      throw new NotFoundException("No user record found for given email address")
    }
    return user
  }

  async findById(id: string): Promise<User> {
    const user = await this.findOne(id)
    if (!user) {
      throw new NotFoundException(`No user record found for given user ID ${id}`)
    }
    return user
  }
}
