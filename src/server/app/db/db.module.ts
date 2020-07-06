import { Module, Global } from "@nestjs/common"
import { MikroOrmModule } from "nestjs-mikro-orm"
import { ReflectMetadataProvider } from "mikro-orm"
import { DbService } from "./db.service"

@Global()
@Module({
  imports: [
    MikroOrmModule.forRootAsync({
      useFactory: () => {
        return {
          metadataProvider: ReflectMetadataProvider,
          // entities: [User],
          // debug: true,
          entities: ["../**/*.entity.js"], // entities from dist dir
          entitiesTs: ["../../../../src/server/app/**/*.entity.ts"],
          type: "postgresql",
          host: "localhost",
          port: 5432,
          user: "tuhlmann",
          password: "tuhlmann",
          dbName: "typeorm-error",
          baseDir: __dirname,
          implicitTransactions: true,
          forceUtcTimezone: true,
        }
      },
    }),
  ],
  providers: [DbService],
  exports: [DbService],
})
export class DbModule {}
