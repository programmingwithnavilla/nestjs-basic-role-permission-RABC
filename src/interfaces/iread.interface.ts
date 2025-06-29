export interface IRead<T> {
  findAll(): Promise<T[]>;
  findById(id: string): Promise<T>;
  findByCondition(condition: Partial<T>): Promise<T | null>;
}
