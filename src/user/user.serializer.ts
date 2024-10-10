import { Exclude, Expose } from 'class-transformer';
import { User } from './user';

export class UserSerializer {
  @Expose({ name: 'id', toPlainOnly: true })
  id: string;

  @Expose({ name: 'username', toPlainOnly: true })
  username: string;

  @Expose({ name: 'email', toPlainOnly: true })
  email: string;

  @Expose({ name: 'first_name', toPlainOnly: true })
  firstName?: string;

  @Expose({ name: 'last_name', toPlainOnly: true })
  lastName?: string;

  @Expose({ name: 'birthday', toPlainOnly: true })
  birthday: string;

  @Expose({ name: 'bio', toPlainOnly: true })
  bio: string;

  @Expose({ name: 'profilePictureUrl', toPlainOnly: true })
  profilePictureUrl: string;

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
