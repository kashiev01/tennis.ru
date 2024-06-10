import { Prisma } from '@prisma/client';

export interface BaseInterfaceRepository<T> {
  create(data: Prisma.Prisma__Pick<T, any>): Promise<T>;
  createMany(data: Prisma.Prisma__Pick<T, any>[]): Promise<T[]>;
  save(data: Prisma.Prisma__Pick<T, any>): Promise<T>;
  saveMany(data: Prisma.Prisma__Pick<T, any>[]): Promise<T[]>;
  findOneById(id: number): Promise<T | null>;
  findByCondition(
    filterCondition: Prisma.Prisma__Pick<T, any>,
  ): Promise<T | null>;
  findAll(): Promise<T[]>;
  deleteById(id: number): Promise<T>;
  findWithRelations(relations: Prisma.Prisma__Pick<T, any>): Promise<T[]>;
}
