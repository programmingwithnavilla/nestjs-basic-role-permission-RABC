export interface IRead<T> {
  findAll(): Promise<T[]>;
  findById(id: string): Promise<T | null>;
  findByCondition(condition: Partial<T>): Promise<T | null>;
}
