import { RegisterUserDto, SessionDto, SessionUser } from "@common/session/dto/session-data.dto"
import { Body, Controller, Get, Post, UseInterceptors, ValidationPipe } from "@nestjs/common"
import { UsersService } from "@srv/users/users.service"
import { ClassToDtoInterceptor } from "@srv/utils/class-to-dto.interceptor"
import { EntityManager, MikroORM } from "mikro-orm"
import { GetUser } from "./get-user.decorator"
import { SessionService } from "./session.service"

@Controller()
export class SessionController {
  constructor(
    private readonly sessionService: SessionService,
    private readonly usersService: UsersService,
    private readonly em: EntityManager,
    private readonly orm: MikroORM,
  ) {}

  @UseInterceptors(new ClassToDtoInterceptor(SessionDto, { excludeExtraneousValues: false }))
  @Get("api/session/init-session")
  async initializeSession(@GetUser() sessUser: SessionUser): Promise<SessionDto> {
    return this.sessionService.initializeSession(false, sessUser, "")
  }

  @Post("api/users/create")
  async createUser(@Body(ValidationPipe) userData: RegisterUserDto) {
    const user = this.usersService.createInstance(userData)
    const savedUser = await this.usersService.saveUser(user)
    console.log("savedUser", savedUser)

    return savedUser
  }
}
