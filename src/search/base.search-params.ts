export interface BaseSearchParams {
  query?: string | null;
  queryBy?: string | null;
  language?: string;
  page?: number | null;
  perPage?: number | null;
  sortBy?: string | null;
  sortDirection?: 'asc' | 'desc' | null;
  filterBy?: string | null;
  includeFields?: string | null;
  excludeFields?: string | null;
}
