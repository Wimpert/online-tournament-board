import { User } from './../../../../frontend/src/models/user.model';

export interface JwtPayload {
  user: User;
  id: number;
}
