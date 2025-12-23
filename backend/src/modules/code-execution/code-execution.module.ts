import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CodeDraft } from "./entities/code_drafts.entity";
import { CodeRun } from "./entities/code_runs.entity";
import { ProgrammingLanguage } from "./entities/programming_languages.entity";
@Module({
  imports: [
    TypeOrmModule.forFeature([CodeDraft, CodeRun, ProgrammingLanguage]),
  ]
})
export class CodeExecutionModule { }
