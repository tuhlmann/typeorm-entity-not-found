import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { UserRepository } from "./user.repository"
import { UsersService } from "./users.service"

/**
 * NOTE: You need to export TypeOrmModule because others will user the UserRepository.
 * If we just export the UserRepository it will not have the base functionality.
 */

@Module({
  imports: [TypeOrmModule.forFeature([UserRepository])],
  controllers: [],
  providers: [UsersService],
  exports: [UsersService, TypeOrmModule],
})
export class UsersModule {}
