export class MediaGenre {
  genreId: string;
  mediaId: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(attributes?: Pick<MediaGenre, 'genreId' | 'mediaId'>) {
    Object.assign(this, attributes);
  }
}
