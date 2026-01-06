import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserSession } from "../entities/user_sessions.entity";
import { Repository } from "typeorm";
@Injectable()
export class SessionsService {
    constructor(
        @InjectRepository(UserSession)
        private readonly userSessionRepository: Repository<UserSession>
    ) { }

    async create(data: Partial<UserSession>): Promise<UserSession> {
        return this.userSessionRepository.create(data);
    }

    async save(userSession: UserSession): Promise<UserSession> {
        return this.userSessionRepository.save(userSession);
    }
}
