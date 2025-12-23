import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuditLog } from "./entities/audit_logs.entity";
import { ProblemAnalyticsDaily } from "./entities/problem_analytics_daily.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([AuditLog, ProblemAnalyticsDaily]),
  ]
})
export class AnalyticsModule { }
