import { User } from './user.entity';

export abstract class UsersRepository {
  abstract create(params: User): Promise<User>;

  abstract findBy(params: Partial<User>): Promise<User>;
}
