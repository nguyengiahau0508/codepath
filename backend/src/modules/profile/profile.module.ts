import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Skill } from "./entities/skills.entity";
import { UserSkill } from "./entities/user_skills.entity";


@Module({
  imports: [
    TypeOrmModule.forFeature([
      Skill,
      UserSkill
    ]),
  ]
})
export class ProfileModule { }
