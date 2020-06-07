import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { SessionModule } from "./session/session.module"

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "postgres",
      host: "localhost",
      port: 5432,
      username: "postgres",
      password: "postgres",
      database: "typeorm-error",
      entities: [`${__dirname}/**/*.entity{.ts,.js}`], // entities from dist dir, fails
      // entities: [`${__dirname}/../../../src/server/app/**/*.entity{.ts,.js}`], // entities from source dir, works
      synchronize: true,
    }),
    SessionModule,
  ],
})
export class AppModule {}
