export class TitleGenre {
  genreId: string;
  titleId: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(attributes?: Pick<TitleGenre, 'genreId' | 'titleId'>) {
    Object.assign(this, attributes);
  }
}
