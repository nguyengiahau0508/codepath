import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProblemChecker } from "./entities/problem_checkers.entity";
import { ProblemExample } from "./entities/problem_examples.entity";
import { ProblemHint } from "./entities/problem_hints.entity";
import { ProblemStatement } from "./entities/problem_statements.entity";
import { ProblemVersion } from "./entities/problem_versions.entity";
import { Problem } from "./entities/problems.entity";
import { TestCase } from "./entities/test_cases.entity";
import { TestGroup } from "./entities/test_groups.entity";
import { ProblemsService } from "./services/problems.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ProblemChecker,
      ProblemExample,
      ProblemHint,
      ProblemStatement,
      ProblemVersion,
      Problem,
      TestCase,
      TestGroup
    ]),
  ],
  providers: [
    // Services go here
    ProblemsService
  ],
  controllers: [],
})
export class ProblemAuthoringModule { }
