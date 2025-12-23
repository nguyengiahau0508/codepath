
// modules/problem-metadata/entities/problem-company.entity.ts
import { Problem } from 'src/modules/problem-authoring/entities/problems.entity';
import {
  Entity,
  ManyToOne,
  JoinColumn,
  PrimaryColumn,
  Index,
  CreateDateColumn,
} from 'typeorm';
import { Company } from './companies.entity';

@Entity('problem_companies')
@Index('idx_problem_companies_problem', ['problemId'])
@Index('idx_problem_companies_company', ['companyId'])
export class ProblemCompany {
  @PrimaryColumn({ name: 'problem_id', type: 'bigint' })
  problemId: number;

  @PrimaryColumn({ name: 'company_id', type: 'bigint' })
  companyId: number;

  @ManyToOne(() => Problem, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'problem_id' })
  problem: Problem;

  @ManyToOne(() => Company, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'company_id' })
  company: Company;

  /* ===== Timestamps ===== */

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
