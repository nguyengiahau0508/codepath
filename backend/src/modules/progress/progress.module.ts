import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Badge } from "./entities/badges.entity";
import { UserBadge } from "./entities/user_badges.entity";
import { UserProblemStat } from "./entities/user_problem_stats.entity";


@Module({
  imports: [
    TypeOrmModule.forFeature([
      Badge,
      UserBadge,
      UserProblemStat
    ])
  ]
})
export class ProgressModule { }
