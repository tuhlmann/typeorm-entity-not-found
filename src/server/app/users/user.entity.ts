import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm"
import { UserRegisterState } from "@common/session/session.interface"

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string

  @CreateDateColumn({ type: "timestamptz" })
  created: Date

  @UpdateDateColumn({ type: "timestamptz" })
  updated: Date

  @Index({ unique: true })
  @Column()
  email: string

  @Column()
  name: string

  @Column({ type: "enum", enum: UserRegisterState })
  registerState: UserRegisterState
}
