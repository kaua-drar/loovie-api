export class BaseSearchResponse<T> {
  results: T[];
  page: number;
  perPage: number;
}
