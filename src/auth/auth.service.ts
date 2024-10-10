import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { SignUpDto } from './dtos/sign-up.dto';
import { User } from 'src/user/user';
import { LoginDto } from './dtos/login.dto';
import { JwtService } from '@nestjs/jwt';
import { PasswordEncoderService } from 'src/security/password-encoder.service';
import { AuthRepository } from './auth.repository';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class AuthService {
  constructor(
    private authRepository: AuthRepository,
    private passwordEncoderService: PasswordEncoderService,
    private jwtService: JwtService,
  ) {}

  async signUp({
    email,
    username,
    firstName,
    lastName,
    birthday,
    password,
  }: SignUpDto) {
    const encodedPassword = await this.passwordEncoderService.encode(password);
    const parsedBirthday = new Date(birthday);

    const newUser = new User({
      email,
      username,
      firstName,
      lastName,
      birthday: parsedBirthday,
      password: encodedPassword,
    });

    try {
      const user = await this.authRepository.create(newUser);
      const token = await this.generateToken(user);

      return {
        user,
        token,
      };
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new ConflictException(
          `The ${error.meta.target[0]} is already taken.`,
        );
      }

      throw error;
    }
  }

  async login({ email, username, password }: LoginDto) {
    let user: User;

    try {
      user = await this.authRepository.findBy({ email, username });
    } catch (error) {
      throw new UnauthorizedException('User not found');
    }

    const isPasswordValid = await this.passwordEncoderService.compare(
      password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid password');
    }

    const token = await this.generateToken(user);

    return {
      user,
      token,
    };
  }

  private async generateToken(user: User) {
    const payload = {
      sub: user.id,
      username: user.username,
    };

    const token = await this.jwtService.signAsync(payload);

    return token;
  }
}
