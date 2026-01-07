import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserSession } from "../entities/user_sessions.entity";
import { Repository } from "typeorm";
import { NotFoundException } from "@nestjs/common";
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

    async findOne(id: number): Promise<UserSession | null> {
        return this.userSessionRepository.findOne({ where: { id } });
    }   

    async update(
        id: number,
        patch: Partial<UserSession>,
    ): Promise<UserSession> {
    const session = await this.userSessionRepository.findOne({
      where: { id },
    });

    if (!session) {
      throw new NotFoundException('User session not found');
    }

    Object.assign(session, patch);

    return this.userSessionRepository.save(session);
  }

    async delete(userSession: UserSession): Promise<UserSession> {
        return this.userSessionRepository.remove(userSession);
    }
}
