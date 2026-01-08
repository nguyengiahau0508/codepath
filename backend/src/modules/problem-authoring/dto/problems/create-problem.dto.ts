import { IsEnum, IsString } from 'class-validator';
import { ProblemDifficulty } from '../../enums/problem-difficulty.enum';
import { ProblemStatus } from '../../enums/problem-status.enum';

export class CreateProblemDto {
  @IsString()
  code: string;

  @IsEnum(ProblemDifficulty)
  difficulty: ProblemDifficulty;

  @IsEnum(ProblemStatus)
  status: ProblemStatus;
}
