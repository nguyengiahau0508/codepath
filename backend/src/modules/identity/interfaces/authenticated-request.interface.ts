import { Request } from 'express';
import { User } from '../entities/users.entity';

export interface AuthenticatedRequest extends Request {
  user: User;
}
