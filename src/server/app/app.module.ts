import { Module } from "@nestjs/common"
import { DbModule } from "./db/db.module"
import { SessionModule } from "./session/session.module"
import { UsersModule } from "./users/users.module"

@Module({
  imports: [DbModule, SessionModule, UsersModule],
})
export class AppModule {}
