import { Option } from "@common/models/base"
import { SessionDto, SessionUser } from "@common/session/dto/session-data.dto"
import { Injectable, Logger } from "@nestjs/common"
import { InjectModel } from "@nestjs/sequelize"
import { User } from "../users/user.entity"
import { UsersRepository } from "@srv/users/users.repository"

@Injectable()
export class SessionService {
  constructor(private readonly userRepository: UsersRepository) {}

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
        const user = await this.userRepository.findById(sessionUser.id)
        // session.user = user
      } catch (error) {
        Logger.error("user from session not found. ID: " + sessionUser.id)
        // this.logout(req)
      }
    }

    return session
  }
}
