import { Module } from "@nestjs/common"
import { UsersModule } from "@srv/users/users.module"
import { SessionController } from "./session.controller"
import { SessionService } from "./session.service"

@Module({
  imports: [UsersModule],
  controllers: [SessionController],
  providers: [SessionService],
  exports: [SessionService],
})
export class SessionModule {}
