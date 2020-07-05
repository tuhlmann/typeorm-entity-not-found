import { Module } from "@nestjs/common"
import { MikroOrmModule } from "nestjs-mikro-orm"
import { SessionModule } from "./session/session.module"
import { User } from "./users/user.entity"
// import { UserRepository } from "./users/user.repository"
import globby from "globby"
import { ReflectMetadataProvider } from "mikro-orm"
import { UsersModule } from "./users/users.module"

@Module({
  imports: [
    // TypeOrmModule.forRoot({
    //   type: "postgres",
    //   host: "localhost",
    //   port: 5432,
    //   username: "tuhlmann",
    //   password: "tuhlmann",
    //   database: "typeorm-error",
    //   entities: [`${__dirname}/**/*.entity{.ts,.js}`], // entities from dist dir, fails
    //   // entities: [`${__dirname}/../../../src/server/app/**/*.entity{.ts,.js}`], // entities from source dir, works
    //   synchronize: true,
    // }),
    MikroOrmModule.forRoot({
      metadataProvider: ReflectMetadataProvider,
      entities: [User],
      entitiesDirsTs: [`${__dirname}/../../../src/server/app`],
      type: "postgresql",
      host: "localhost",
      port: 5432,
      user: "tuhlmann",
      password: "tuhlmann",
      dbName: "typeorm-error",
      baseDir: __dirname,
      tsNode: false,
      implicitTransactions: true,
      forceUtcTimezone: true,
      autoFlush: false,
    }),
    SessionModule,
    UsersModule,
  ],
})
export class AppModule {}
