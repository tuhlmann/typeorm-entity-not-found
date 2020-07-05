import { Option } from "@common/models/base"
import { SessionDto, SessionUser } from "@common/session/dto/session-data.dto"
import { Injectable, Logger } from "@nestjs/common"
import { UserRepository } from "../users/user.repository"
import { InjectRepository } from "nestjs-mikro-orm"
import { User } from "@srv/users/user.entity"

@Injectable()
export class SessionService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: UserRepository,
  ) {}

  baseSession(isAuthenticated: boolean, csrfToken: string): SessionDto {
    return { isLoggedIn: isAuthenticated, csrfToken }
  }

  async initializeSession(
    isAuthenticated: boolean,
    sessionUser: Option<SessionUser>,
    csrfToken: string,
  ): Promise<SessionDto> {
    const session: SessionDto = this.baseSession(isAuthenticated, csrfToken)
    if (isAuthenticated && sessionUser) {
      try {
        session.user = await this.userRepository.findById(sessionUser.id)
      } catch (error) {
        Logger.error("user from session not found. ID: " + sessionUser.id)
        // this.logout(req)
      }
    }

    return session
  }
}
