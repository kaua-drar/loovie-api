import { Test, TestingModule } from '@nestjs/testing';
import { usersServiceMock } from './mocks/users.service.mock';
import { UsersController } from '../users.controller';
describe('UsersController', () => {
  let usersController: UsersController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [usersServiceMock],
    }).compile();

    usersController = app.get<UsersController>(UsersController);
  });

  describe('root', () => {
    it('should return all users', async () => {
      const response = await usersController.findAll();
      expect(response.length).toBe(1);
      expect(response[0].email).toBe('johndoe@example.com');
    });
  });
});
