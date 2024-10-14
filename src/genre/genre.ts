export class Genre {
  id: string;
  tmdbId: number;
  createdAt: Date;
  updatedAt: Date;

  constructor(attributes?: Pick<Genre, 'tmdbId'>) {
    Object.assign(this, attributes);
  }
}
