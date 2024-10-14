export class MediaTranslation {
  title: string;
  overview: string;
  languageCode: string;
  mediaId: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(attributes?: Omit<MediaTranslation, 'createdAt' | 'updatedAt'>) {
    Object.assign(this, attributes);
  }
}
