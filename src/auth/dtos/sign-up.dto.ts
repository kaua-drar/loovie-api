import { IsEmail, IsNotEmpty } from 'class-validator';

export class SignUpDto {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  firstName: string;

  lastName: string;

  @IsNotEmpty()
  password: string;
}
