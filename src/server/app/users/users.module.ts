import { Module } from "@nestjs/common"
import { UserRepository } from "./user.repository"
import { UsersService } from "./users.service"
import { User } from "./user.entity"
import { MikroOrmModule } from "nestjs-mikro-orm"

/**
 * NOTE: You need to export TypeOrmModule because others will user the UserRepository.
 * If we just export the UserRepository it will not have the base functionality.
 */

@Module({
  imports: [MikroOrmModule.forFeature({ entities: [User] })],
  controllers: [],
  providers: [UsersService],
  exports: [UsersService, MikroOrmModule],
})
export class UsersModule {}
