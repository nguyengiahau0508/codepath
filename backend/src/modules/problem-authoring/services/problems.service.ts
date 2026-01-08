import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Problem } from '../entities/problems.entity';
import { BaseService } from 'src/common/base/base.service';
import { Repository } from 'typeorm';
import { CreateProblemDto } from '../dto/problems/create-problem.dto';
@Injectable()
export class ProblemsService extends BaseService<Problem> {
    constructor(
        @InjectRepository(Problem)
        protected readonly repository: Repository<Problem>,
    ){
        super(repository);
    }

    async createProblem(authorId: number, createProblemDto: CreateProblemDto): Promise<Problem> {
        const createdProblem = this.create({
            ...createProblemDto,
            createdBy: {
                id: authorId
            }
        })
        return this.save(createdProblem);
    }

}