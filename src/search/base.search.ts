export abstract class BaseSearch<T extends object> {
  abstract collection: string;

  abstract createCollection(date: string): Promise<void>;
  abstract setup(): Promise<void>;
  abstract index(params: T): Promise<void>;
}
