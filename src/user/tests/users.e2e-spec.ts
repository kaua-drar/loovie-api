import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { UsersModule } from '../users.module';
import { PrismaModule } from '../../database/prisma.module';
import { AppModule } from 'src/app.module';
import { PrismaService } from 'src/database/prisma.service';
import { UsersRepository } from '../users.repository';
import { User } from '../user';
import { JwtService } from '@nestjs/jwt';

describe('UserController (e2e)', () => {
  let app: INestApplication;
  let prismaService: PrismaService;
  let usersRepository: UsersRepository;
  let user: User;
  let token: string;
  let jwtService: JwtService;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule, PrismaModule, UsersModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    prismaService = moduleFixture.get(PrismaService);
    usersRepository = moduleFixture.get(UsersRepository);
    user = await usersRepository.create(
      new User({
        email: 'johndoe@example.com',
        username: 'johndoe',
        firstName: 'John',
        lastName: 'Doe',
        password: 'password',
      }),
    );

    const payload = {
      sub: user.id,
      username: user.username,
    };

    jwtService = moduleFixture.get(JwtService);

    token = await jwtService.signAsync(payload);
  });

  afterEach(async () => {
    const deleteUsers = prismaService.user.deleteMany();
    await prismaService.$transaction([deleteUsers]);
  });

  afterAll(async () => {
    await app.close();

    const deleteUsers = prismaService.user.deleteMany();
    await prismaService.$transaction([deleteUsers]);

    await prismaService.$disconnect();
  });

  describe('/users (GET)', () => {
    it('should find and return all users', () => {
      return request(app.getHttpServer())
        .get('/users')
        .set('Authorization', `Bearer ${token}`)
        .expect(200)
        .expect((response) => {
          expect(response.body).toEqual(
            expect.arrayContaining([
              expect.objectContaining({
                id: expect.any(String),
                email: 'johndoe@example.com',
                username: 'johndoe',
                first_name: 'John',
                last_name: 'Doe',
                full_name: 'John Doe',
                created_at: expect.any(String),
                updated_at: expect.any(String),
              }),
            ]),
          );
        });
    });

    it('should unauthorize request due to invalid token provided', () => {
      return request(app.getHttpServer())
        .get('/users')
        .set('Authorization', `Bearer 1nv4lidT0k3n`)
        .expect(401)
        .expect((response) => {
          expect(response.body).toEqual(
            expect.objectContaining({
              error: 'Unauthorized',
              message: 'Invalid token',
              statusCode: 401,
            }),
          );
        });
    });

    it('should unauthorize request when not providing a token', () => {
      return request(app.getHttpServer())
        .get('/users')
        .expect(401)
        .expect((response) => {
          expect(response.body).toEqual(
            expect.objectContaining({
              error: 'Unauthorized',
              message: 'Token not found',
              statusCode: 401,
            }),
          );
        });
    });
  });
});
