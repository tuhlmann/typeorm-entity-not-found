// import {
//   Column,
//   CreateDateColumn,
//   Entity,
//   Index,
//   PrimaryGeneratedColumn,
//   UpdateDateColumn,
// } from "typeorm"
// import { UserRegisterState } from "@common/session/session.interface"

// @Entity()
// export class User {
//   @PrimaryGeneratedColumn("uuid")
//   id: string

//   @CreateDateColumn({ type: "timestamptz" })
//   created: Date

//   @UpdateDateColumn({ type: "timestamptz" })
//   updated: Date

//   @Index({ unique: true })
//   @Column()
//   email: string

//   @Column()
//   name: string

//   @Column({ type: "enum", enum: UserRegisterState })
//   registerState: UserRegisterState
// }

import { Column, Model, Table, Index, CreatedAt, UpdatedAt } from "sequelize-typescript"
import { ConflictException, InternalServerErrorException, NotFoundException } from "@nestjs/common"
import { UserRegisterState } from "@common/session/session.interface"
import { DataTypes } from "sequelize"

@Table
export class User extends Model<User> {
  @Column({ primaryKey: true, type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4 })
  id: string

  @CreatedAt
  created: Date

  @UpdatedAt
  updated: Date

  @Index({ unique: true })
  @Column
  email: string

  @Column
  name: string

  @Column({
    type: DataTypes.ENUM(UserRegisterState.unverified, UserRegisterState.verified),
    defaultValue: UserRegisterState.unverified,
  })
  registerState: UserRegisterState

  // @Column({ defaultValue: true })
  // isActive: boolean
}
