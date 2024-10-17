import { TitleGenre } from './title-genre';

export abstract class TitleGenresRepository {
  abstract create(params: TitleGenre): Promise<TitleGenre>;
}
