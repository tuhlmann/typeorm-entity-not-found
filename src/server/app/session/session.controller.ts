import { SessionDto, SessionUser } from "@common/session/dto/session-data.dto"
import { Controller, Get, UseInterceptors } from "@nestjs/common"
import { ClassToDtoInterceptor } from "@srv/utils/class-to-dto.interceptor"
import { GetUser } from "./get-user.decorator"
import { SessionService } from "./session.service"

@Controller()
export class SessionController {
  constructor(private readonly sessionService: SessionService) {}

  @UseInterceptors(new ClassToDtoInterceptor(SessionDto, { excludeExtraneousValues: false }))
  @Get("api/session/init-session")
  async initializeSession(@GetUser() sessUser: SessionUser): Promise<SessionDto> {
    return this.sessionService.initializeSession(false, sessUser, "")
  }
}
