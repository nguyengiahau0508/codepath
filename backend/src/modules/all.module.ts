import { Module } from "@nestjs/common";
import { AnalyticsModule } from "./analytics/analytics.module";
import { CodeExecutionModule } from "./code-execution/code-execution.module";
import { ContestParticipant } from "./contest/entities/contest_participants.entity";
import { DiscussionModule } from "./discussion/discussion.module";
import { IdentityModule } from "./identity/identity.module";
import { JudgeModule } from "./judge/judge.module";
import { ProblemAuthoringModule } from "./problem-authoring/problem-authoring.module";
import { ProblemMetadataModule } from "./problem-metadata/problem-metadata.module";
import { ProfileModule } from "./profile/profile.module";
import { ProgressModule } from "./progress/progress.module";
import { ReferenceModule } from "./reference/reference.module";


@Module({
  imports: [
    AnalyticsModule,
    CodeExecutionModule,
    ContestParticipant,
    DiscussionModule,
    IdentityModule,
    JudgeModule,
    ProblemAuthoringModule,
    ProblemMetadataModule,
    ProfileModule,
    ProgressModule,
    ReferenceModule
  ],
})
export class AllModule { }
