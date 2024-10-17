export interface TdmbMovie {
  id: number;
  title: string;
  original_title: string;
  original_language: string;
  overview: string;
  popularity: number;
  release_date: string;
  poster_path: string;
  backdrop_path: string;
  genre_ids: number[];
  vote_average: number;
  vote_count: number;
  adult: boolean;
}
