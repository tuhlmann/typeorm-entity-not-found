import { Injectable, Logger } from "@nestjs/common"
import { MikroORM } from "mikro-orm"

@Injectable()
export class DbService {
  private readonly logger = new Logger(DbService.name)

  constructor(private readonly orm: MikroORM) {}

  async syncDbSchema(): Promise<void> {
    const generator = this.orm.getSchemaGenerator()

    if ((process.env.NODE_ENV || "development") === "development") {
      this.logger.log("In Development, syncing db schema")

      // const dropDump = await generator.getDropSchemaSQL()
      // console.log("DROP:", dropDump)

      // const createDump = await generator.getCreateSchemaSQL()
      // console.log("CREATE:", createDump)

      // const updateDump = await generator.getUpdateSchemaSQL()
      // console.log("UPDATE:", updateDump)

      // ONLY for DEV!
      await generator.updateSchema()
    }
  }
}
