import { Required } from 'utility-types';
import { Language } from './language';

export abstract class LanguagesRepository {
  abstract findBy(params: Partial<Language>): Promise<Language>;

  abstract findOrCreate(
    params: Required<Partial<Language>, 'code'>,
  ): Promise<Language>;
}
