import { DocumentWithId } from "@common/models/base"
import { Expose, Type } from "class-transformer"
import { IsEmail, IsString, MaxLength, MinLength } from "class-validator"

export class UserDto implements DocumentWithId {
  @Expose()
  id: string

  @Expose()
  @Type(() => Date)
  created?: Date

  @Expose()
  @Type(() => Date)
  updated?: Date

  @Expose()
  @IsEmail({}, { message: "Please enter your email address" })
  email: string

  @Expose()
  @IsString()
  @MinLength(1, { message: "Please provide a name" })
  @MaxLength(200, { message: "Your name is a bit too long for us to handle!" })
  name: string
}
