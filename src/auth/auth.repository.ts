import { User } from 'src/user/user';

export abstract class AuthRepository {
  abstract create(params: User): Promise<User>;

  abstract findBy(params: Partial<Omit<User, 'password'>>): Promise<User>;
}
