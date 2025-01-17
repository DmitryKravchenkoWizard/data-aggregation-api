import { EntityRepository, Repository } from 'typeorm';
import { CoinEntity } from '../entities/coin.entity';
import { ICoinRepository } from '../interfaces/repositories/coin.repository-interface';
import { CreateCoinDto } from '../dto/in/create-coin.dto';

@EntityRepository(CoinEntity)
export class CoinRepository extends Repository<CoinEntity>
  implements ICoinRepository
{
  public async createOne(createCoinDto: CreateCoinDto): Promise<CoinEntity> {
    const entity = this.create(createCoinDto);

    await this.save(entity);

    return entity;
  }

  public async updateOne(
    id: number,
    updateDto: CreateCoinDto,
  ): Promise<CoinEntity> {
    await this.update(id, updateDto);

    return this.getOne(id);
  }

  private async getOne(id: number): Promise<CoinEntity> {
    const entity = await this.findOne({
      where: { id },
      relations: ['chain'],
    });

    if (!entity) {
      return null;
    }

    return entity;
  }
}
