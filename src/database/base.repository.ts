export abstract class BaseRepository {
  abstract findAll(): Promise<any[]>;
}
