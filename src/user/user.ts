export class User {
  id: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  birthDate: Date;
  password: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(
    attributes?: Pick<
      User,
      'email' | 'username' | 'firstName' | 'lastName' | 'birthDate' | 'password'
    >,
  ) {
    Object.assign(this, attributes);
  }
}
