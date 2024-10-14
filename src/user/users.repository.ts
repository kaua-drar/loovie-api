import { User } from './user';

export abstract class UsersRepository {
  abstract create(params: User): Promise<User>;

  abstract findBy(params: Partial<Omit<User, 'password'>>): Promise<User>;

  abstract findAll(): Promise<User[]>;
}
