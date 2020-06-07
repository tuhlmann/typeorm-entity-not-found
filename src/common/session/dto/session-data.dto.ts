import { Expose, Type } from "class-transformer"
import { IsEmail, IsString, MaxLength, MinLength } from "class-validator"
import { UserDto } from "../../users/dto/user-data.dto"

export class RegisterUserDto {
  @IsEmail({}, { message: "Please enter your email address" })
  email: string

  @IsString()
  @MinLength(1, { message: "Please provide a name" })
  @MaxLength(200, { message: "Your name is a bit too long for us to handle!" })
  name: string
}

export class SessionUser {
  @Expose()
  id: string

  @Expose()
  email: string
}

export class SessionDto {
  @Expose()
  isLoggedIn: boolean
  @Expose()
  csrfToken: string

  @Expose()
  @Type(() => UserDto)
  user?: UserDto

  @Expose()
  command?: string
}
