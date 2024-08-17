import { Request } from 'express';
import { User } from 'src/user/user';

export interface AuthRequest extends Request {
  user: User;
}
