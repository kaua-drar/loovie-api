import { IsEmail, IsNotEmpty } from 'class-validator';

export class SignUpBodyDto {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  first_name?: string;

  last_name?: string;

  @IsNotEmpty()
  password: string;
}
