import { IsNotEmpty, ValidateIf } from 'class-validator';

export class LoginDto {
  @ValidateIf((o) => !o.email)
  @IsNotEmpty()
  username: string;

  @ValidateIf((o) => !o.username)
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;
}
