import { BaseSearch } from 'src/search/base.search';
import { ProductionTranslationDocument } from './production-translation.document';
import { ProductionTranslationIndexDto } from './dtos/production-translation.index.dto';

export abstract class MovieTranslationsSearch extends BaseSearch<
  ProductionTranslationIndexDto,
  ProductionTranslationDocument & { movieId: string }
> {}
