import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { JudgeJob } from "./entities/judge_jobs.entity";
import { Submission } from "./entities/submissions.entity";
import { SubmissionTestcaseResult } from "./entities/submission_testcase_results.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      JudgeJob,
      Submission,
      SubmissionTestcaseResult
    ]),
  ],
})
export class JudgeModule { }
