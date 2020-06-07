import { SessionUser } from "@common/session/dto/session-data.dto"
import { createParamDecorator, ExecutionContext } from "@nestjs/common"

export const GetUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): SessionUser => {
    const req = ctx.switchToHttp().getRequest()
    return req.user as SessionUser
  },
)
