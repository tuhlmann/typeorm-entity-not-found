import { Module } from "@nestjs/common"
import { SessionModule } from "./session/session.module"
import { SequelizeModule } from "@nestjs/sequelize"
import { UsersModule } from "./users/users.module"

@Module({
  imports: [
    // TypeOrmModule.forRoot({
    //   type: "postgres",
    //   host: "localhost",
    //   port: 5432,
    //   username: "postgres",
    //   password: "postgres",
    //   database: "typeorm-error",
    //   entities: [`${__dirname}/**/*.entity{.ts,.js}`], // entities from dist dir, fails
    //   // entities: [`${__dirname}/../../../src/server/app/**/*.entity{.ts,.js}`], // entities from source dir, works
    //   synchronize: true,
    // }),
    SequelizeModule.forRootAsync({
      useFactory: () => ({
        dialect: "postgres",
        host: "localhost",
        port: 5432,
        username: "tuhlmann",
        password: "tuhlmann",
        database: "typeorm-error",
        // models: [`${__dirname}/**/*.entity{.ts,.js}`],
        autoLoadModels: true,
        synchronize: true,
      }),
    }),
    SessionModule,
    UsersModule,
  ],
})
export class AppModule {}
