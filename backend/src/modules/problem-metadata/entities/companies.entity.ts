
// modules/problem-metadata/entities/company.entity.ts
import { BaseEntity } from 'src/common/base/base.entity';
import { Entity, Column, OneToMany } from 'typeorm';
import { ProblemCompany } from './problem_companies.entity';

@Entity('companies')
export class Company extends BaseEntity {
  @Column({ length: 100, unique: true, nullable: true })
  slug?: string;

  @Column({ length: 100 })
  name: string;

  @OneToMany(() => ProblemCompany, (pc) => pc.company)
  problemCompanies: ProblemCompany[];
}
