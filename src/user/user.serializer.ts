import { Exclude, Expose } from 'class-transformer';
import { User } from './user.entity';

export class UserSerializer {
  id: string;

  username: string;

  email: string;

  @Expose({ name: 'first_name' })
  firstName?: string;

  @Expose({ name: 'last_name' })
  lastName?: string;

  @Expose({ name: 'full_name' })
  getFullName() {
    return `${this.firstName} ${this.lastName}`;
  }

  @Expose({ name: 'created_at' })
  createdAt: Date;

  @Expose({ name: 'updated_at' })
  updatedAt: Date;

  @Exclude()
  password: string;

  constructor(attributes: User) {
    Object.assign(this, attributes);
  }
}
