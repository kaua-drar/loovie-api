import { BaseSearchParams } from './base.search-params';
import { BaseSearchResponse } from './base.search-response';

export abstract class BaseSearch<T extends object, Document extends object> {
  abstract collection: string;

  abstract createCollection(date: string): Promise<void>;
  abstract setup(): Promise<void>;
  abstract index(params: T): Promise<void>;
  abstract search(
    params: BaseSearchParams,
  ): Promise<BaseSearchResponse<Document>>;
}
