import { NestFactory } from "@nestjs/core"
import { NestExpressApplication } from "@nestjs/platform-express"
import "reflect-metadata"
import { AppModule } from "./app/app.module"
import { DbService } from "./app/db/db.service"
import { DbModule } from "./app/db/db.module"

async function bootstrap() {
  console.log("dirname dir is", __dirname)

  const app = await NestFactory.create<NestExpressApplication>(AppModule)

  const dbService: DbService = app.select(DbModule).get(DbService)
  await dbService.syncDbSchema()

  const port = process.env.PORT || 3000

  await app.listen(port)

  console.log(`Application started at ${new Date()}, listening on port ${port}`, {
    msg: "now we start",
  })
}
bootstrap()
