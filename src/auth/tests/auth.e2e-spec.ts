import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { UsersModule } from 'src/user/users.module';
import { AppModule } from 'src/app.module';
import { PrismaService } from 'src/database/prisma.service';
import { AuthModule } from '../auth.module';
import { PrismaModule } from 'src/database/prisma.module';
import { AuthService } from '../auth.service';

describe('Auth (e2e)', () => {
  let app: INestApplication;
  let prismaService: PrismaService;
  let authService: AuthService;

  const payload = {
    email: 'joghndoe@example.com',
    username: 'johndoe',
    firstName: 'John',
    lastName: 'Doe',
    password: 'password',
  };

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule, PrismaModule, UsersModule, AuthModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    prismaService = moduleFixture.get<PrismaService>(PrismaService);

    authService = moduleFixture.get<AuthService>(AuthService);
  });

  afterAll(async () => {
    const deleteUsers = prismaService.user.deleteMany();

    await prismaService.$transaction([deleteUsers]);
    await app.close();
    await prismaService.$disconnect();
  });

  describe('/sign_up (POST)', () => {
    it('should create and return the user and the access token', () => {
      const payload = {
        email: 'janedoe@example.com',
        username: 'janedoe',
        firstName: 'Jane',
        lastName: 'Doe',
        password: 'password',
      };
      return request(app.getHttpServer())
        .post('/sign_up')
        .send(payload)
        .expect(201)
        .expect('Access-Token', /.+/)
        .expect((response) => {
          expect(response.body).toMatchObject({
            id: expect.any(String),
            email: payload.email,
            username: payload.username,
            firstName: payload.firstName,
            lastName: payload.lastName,
            fullName: `${payload.firstName} ${payload.lastName}`,
            createdAt: expect.any(String),
            updatedAt: expect.any(String),
          });
        });
    });
  });

  describe('/login (POST)', () => {
    beforeAll(async () => {
      await authService.signUp(payload);
    });

    it('should authenticate and return user and access token using username', async () => {
      return request(app.getHttpServer())
        .post('/login')
        .send({
          username: payload.username,
          password: payload.password,
        })
        .expect(200)
        .expect((response) => {
          expect(response.body).toMatchObject({
            id: expect.any(String),
            email: payload.email,
            username: payload.username,
            firstName: payload.firstName,
            lastName: payload.lastName,
            fullName: `${payload.firstName} ${payload.lastName}`,
            createdAt: expect.any(String),
            updatedAt: expect.any(String),
          });
        });
    });

    it('should authenticate and return user and access token using email', async () => {
      return request(app.getHttpServer())
        .post('/login')
        .send({
          email: payload.email,
          password: payload.password,
        })
        .expect(200)
        .expect((response) => {
          expect(response.body).toMatchObject({
            id: expect.any(String),
            email: payload.email,
            username: payload.username,
            firstName: payload.firstName,
            lastName: payload.lastName,
            fullName: `${payload.firstName} ${payload.lastName}`,
            createdAt: expect.any(String),
            updatedAt: expect.any(String),
          });
        });
    });

    it('should unauthorize login due to invalid password', async () => {
      return request(app.getHttpServer())
        .post('/login')
        .send({
          username: payload.username,
          password: 'wrong_password',
        })
        .expect((response) => {
          expect(response.body).toMatchObject({
            statusCode: 401,
            message: 'Invalid password',
          });
        });
    });
  });
});
