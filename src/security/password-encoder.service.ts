import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class PasswordEncoderService {
  async encode(password: string): Promise<string> {
    const encodedPassword = await bcrypt.hash(password, 10);

    return encodedPassword;
  }

  async compare(password: string, hashedPassword: string): Promise<boolean> {
    try {
      const isPasswordMatching = await bcrypt.compare(password, hashedPassword);
      return isPasswordMatching;
    } catch (error) {
      return false;
    }
  }
}
