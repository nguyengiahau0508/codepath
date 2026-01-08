import {
  DeepPartial,
  FindOptionsWhere,
  ObjectLiteral,
  Repository,
} from 'typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
@Injectable()
export abstract class BaseService<T extends ObjectLiteral> {
  protected constructor(
    protected readonly repository: Repository<T>,
  ) {}

  create(data: DeepPartial<T>): T {
    return this.repository.create(data);
  }

  async save(entity: DeepPartial<T>): Promise<T> {
    return await this.repository.save(entity);
  }

  async findOne(where: FindOptionsWhere<T>): Promise<T> {
    const entity = await this.repository.findOne({ where });

    if (!entity) {
      throw new NotFoundException('Entity not found');
    }

    return entity;
  }

  async update(
    where: FindOptionsWhere<T>,
    data: DeepPartial<T>,
  ): Promise<T> {
    const entity = await this.findOne(where);
    const merged = this.repository.merge(entity, data);
    return await this.repository.save(merged);
  }

  async remove(where: FindOptionsWhere<T>): Promise<void> {
    const entity = await this.findOne(where);
    await this.repository.remove(entity);
  }
}
