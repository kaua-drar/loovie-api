import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersRepository } from 'src/user/users.repository';
import { SignUpDto } from './dtos/sign-up.dto';
import { PasswordEncoderService } from 'src/security/password-encoder.service';
import { User } from 'src/user/user.entity';
import { LoginDto } from './dtos/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersRepository: UsersRepository,
    private passwordEncoderService: PasswordEncoderService,
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

    const user = this.usersRepository.create(newUser);

    return user;
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
      return user;
    } catch (error) {
      throw new UnauthorizedException('User not found');
    }
  }
}
