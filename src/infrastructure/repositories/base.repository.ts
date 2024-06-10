import { BaseInterfaceRepository } from '../../domain/repositories/base-repository.interface';

export abstract class PrismaBaseRepository<T>
  implements BaseInterfaceRepository<T>
{
  constructor(private readonly model: any) {}

  async create(data: any): Promise<T> {
    return await this.model.create({ data });
  }

  async createMany(data: any[]): Promise<T[]> {
    return await this.model.createMany({ data });
  }

  async save(data: any): Promise<T> {
    return await this.model.update({
      where: { id: data.id },
      data,
    });
  }

  async saveMany(data: any[]): Promise<T[]> {
    return await Promise.all(data.map((item) => this.save(item)));
  }

  async findOneById(id: number): Promise<T | null> {
    return await this.model.findUnique({ where: { id, delete_at: null } });
  }

  async findByCondition(filterCondition: any): Promise<T | null> {
    return await this.model.findUnique({
      where: { deleted_at: null, ...filterCondition },
    });
  }

  async findAll(): Promise<T[]> {
    return await this.model.findMany({ where: { deleted_at: null } });
  }

  async deleteById(id: number): Promise<T> {
    return await this.model.update({
      where: { id },
      data: { deleted_at: new Date() },
    });
  }

  async findWithRelations(relations: any): Promise<T[]> {
    return await this.model.findMany({ include: relations });
  }

  async preload(entityLike: any): Promise<T | null> {
    const { id, ...data } = entityLike;
    return await this.model.upsert({
      where: { id },
      update: data,
      create: entityLike,
    });
  }

  async updateOneById(id: number, data: any): Promise<T> {
    return await this.model.update({
      where: { id },
      data: { ...data, updated_at: new Date() },
    });
  }
}
