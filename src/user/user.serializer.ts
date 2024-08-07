import { Exclude, Expose } from 'class-transformer';
import { User } from './user.entity';

export class UserSerializer {
  id: string;

  username: string;

  email: string;

  @Expose({ name: 'first_name', toPlainOnly: true })
  firstName?: string;

  @Expose({ name: 'last_name', toPlainOnly: true })
  lastName?: string;

  @Expose({ name: 'full_name' })
  getFullName() {
    return `${this.firstName} ${this.lastName}`;
  }

  @Expose({ name: 'created_at', toPlainOnly: true })
  createdAt: Date;

  @Expose({ name: 'updated_at', toPlainOnly: true })
  updatedAt: Date;

  @Exclude()
  password: string;

  constructor(attributes: User) {
    Object.assign(this, attributes);
  }
}
