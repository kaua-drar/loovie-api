import { MediaTranslation } from './media-translation';

export abstract class MediaTranslationsRepository {
  abstract create(params: MediaTranslation): Promise<MediaTranslation>;

  abstract findBy(params: Partial<MediaTranslation>): Promise<MediaTranslation>;
}
