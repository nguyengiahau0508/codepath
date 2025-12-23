import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Company } from "./entities/companies.entity";
import { ProblemCompany } from "./entities/problem_companies.entity";
import { ProblemTag } from "./entities/problem_tags.entity";
import { ProblemTopic } from "./entities/problem_topics.entity";
import { Topic } from "./entities/topics.entity";
import { Tag } from "./entities/tags.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Company,
      ProblemCompany,
      ProblemTag,
      ProblemTopic,
      Tag,
      Topic
    ])
  ]
})
export class ProblemMetadataModule { }
