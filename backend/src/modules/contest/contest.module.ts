import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Contest } from "./entities/contests.entity";
import { ContestSubmission } from "./entities/contest_submissions.entity";
import { ContestProblem } from "./entities/contest_problems.entity";
import { ContestParticipant } from "./entities/contest_participants.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([Contest, ContestSubmission, ContestProblem, ContestParticipant]),
  ],
})
export class ContestModule { }
