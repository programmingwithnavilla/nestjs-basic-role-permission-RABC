export interface IWrite<T> {
  create(items: T): Promise<T>;
  update(id: string, items: Partial<T>): Promise<T>;
  delete(id: string): Promise<void>;
}
