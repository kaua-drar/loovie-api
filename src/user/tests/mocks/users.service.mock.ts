import { randomUUID } from 'node:crypto';
import { UsersService } from 'src/user/users.service';

export const userMock = {
  id: randomUUID(),
  email: 'johndoe@example.com',
  username: 'johndoe',
  firstName: 'John',
  lastName: 'Doe',
  password: 'password',
};

export const usersServiceMock = {
  provide: UsersService,
  useValue: {
    findAll: jest.fn().mockResolvedValue([userMock]),
  },
};
