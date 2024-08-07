import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersRepository } from 'src/user/users.repository';
import { SignUpDto } from './dtos/sign-up.dto';
import { PasswordEncoderService } from 'src/security/password-encoder.service';
import { User } from 'src/user/user.entity';
import { LoginDto } from './dtos/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersRepository: UsersRepository,
    private passwordEncoderService: PasswordEncoderService,
    private jwtService: JwtService,
  ) {}

  async signUp({ email, username, firstName, lastName, password }: SignUpDto) {
    const encodedPassword = await this.passwordEncoderService.encode(password);

    const newUser = new User({
      email,
      username,
      firstName,
      lastName,
      password: encodedPassword,
    });

    const user = await this.usersRepository.create(newUser);

    const token = await this.generateToken(user);

    return {
      user,
      token,
    };
  }

  async login({ email, username, password }: LoginDto) {
    try {
      const user = await this.usersRepository.findBy({ email, username });

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
    } catch (error) {
      throw new UnauthorizedException('User not found');
    }
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
