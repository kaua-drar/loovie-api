export class User {
  id: string;
  username: string;
  email: string;
  firstName?: string;
  lastName?: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(
    attributes?: Pick<
      User,
      'email' | 'username' | 'firstName' | 'lastName' | 'password'
    >,
  ) {
    Object.assign(this, attributes);
  }
}
