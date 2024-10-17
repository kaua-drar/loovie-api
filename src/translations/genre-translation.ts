export class GenreTranslation {
  id: string;
  languageCode: string;
  genreId: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(
    attributes?: Omit<GenreTranslation, 'id' | 'createdAt' | 'updatedAt'>,
  ) {
    Object.assign(this, attributes);
  }
}
