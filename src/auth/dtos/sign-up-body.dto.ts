import { IsDateString, IsEmail, IsNotEmpty } from 'class-validator';

export class SignUpBodyDto {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  lastName: string;

  @IsNotEmpty()
  @IsDateString()
  birthday: string;

  @IsNotEmpty()
  password: string;
}
