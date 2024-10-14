import { MediaGenre } from './media-genre';

export abstract class MediaGenresRepository {
  abstract create(params: MediaGenre): Promise<MediaGenre>;
}
