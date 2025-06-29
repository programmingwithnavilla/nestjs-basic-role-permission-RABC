import { IRead } from 'src/interfaces/iread.interface';
import { IWrite } from 'src/interfaces/iwrite.interface';
import { ObjectLiteral, Repository } from 'typeorm';

export abstract class BaseRepository<T extends ObjectLiteral>
  implements IRead<T>, IWrite<T>
{
  constructor(protected readonly repository: Repository<T>) {}

  async findAll(): Promise<T[]> {
    return this.repository.find();
  }

  async findById(id: string): Promise<T | null> {
    return this.repository.findOneBy({ id } as any);
  }

  async findByCondition(condition: Partial<T>): Promise<T | null> {
    return this.repository.findOneBy(condition as any);
  }

  async create(item: T): Promise<T> {
    return this.repository.save(item);
  }

  async update(id: string, item: Partial<T>): Promise<T> {
    await this.repository.update(id, item);
    const updated = await this.findById(id);
    if (!updated) throw new Error('Entity not found after update');
    return updated;
  }

  async delete(id: string): Promise<void> {
    await this.repository.softDelete(id);
  }
}
