import { Injectable } from "@nestjs/common";
import { BaseService } from "src/common/base/base.service";
import { ProblemChecker } from "../entities/problem_checkers.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class ProblemCheckersService extends BaseService<ProblemChecker> {
    constructor(
        @InjectRepository(ProblemChecker) protected readonly repository: Repository<ProblemChecker>
    ){
        super(repository);
    }
}