import { UserRegisterState } from "@common/session/session.interface"
import { Entity, Enum, Index, PrimaryKey, Property, WrappedEntity } from "mikro-orm"
import { v4 } from "uuid"

@Entity()
export class User {
  @PrimaryKey()
  id: string = v4()

  @Property({ columnType: "timestamptz", onCreate: () => new Date() })
  created: Date

  @Property({ columnType: "timestamptz", onCreate: () => new Date(), onUpdate: () => new Date() })
  updated: Date

  @Index({ options: { unique: true } })
  @Property()
  email: string

  @Property()
  name: string

  @Enum({ type: "UserRegisterState", items: () => UserRegisterState })
  registerState: UserRegisterState = UserRegisterState.unverified
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface User extends WrappedEntity<User, "id"> {}
