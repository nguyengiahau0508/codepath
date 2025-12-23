
// modules/problem-metadata/entities/problem-company.entity.ts
import { Problem } from 'src/modules/problem-authoring/entities/problems.entity';
import {
  Entity,
  ManyToOne,
  JoinColumn,
  PrimaryColumn,
} from 'typeorm';
import { Company } from './companies.entity';

@Entity('problem_companies')
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
}
