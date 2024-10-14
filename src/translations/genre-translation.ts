export class GenreTranslation {
  name: string;
  languageCode: string;
  genreId: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(attributes?: Omit<GenreTranslation, 'createdAt' | 'updatedAt'>) {
    Object.assign(this, attributes);
  }
}
