import { Module } from "@nestjs/common"
import { SequelizeModule } from "@nestjs/sequelize"
import { User } from "./user.entity"
import { UsersService } from "./users.service"
import { UsersRepository } from "./users.repository"

/**
 * NOTE: You need to export TypeOrmModule because others will user the UserRepository.
 * If we just export the UserRepository it will not have the base functionality.
 */

@Module({
  imports: [SequelizeModule.forFeature([User])],
  controllers: [],
  providers: [UsersService, UsersRepository],
  exports: [UsersService, UsersRepository, SequelizeModule],
})
export class UsersModule {}
