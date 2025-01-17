import { EntityRepository, Repository } from 'typeorm';
import { CoinHistoryRecordEntity } from '../entities/coin-history-record.entity';
import { CreateCoinHistoryRecordDto } from '../dto/in/create-history.dto';

@EntityRepository(CoinHistoryRecordEntity)
export class HistoryRepository extends Repository<CoinHistoryRecordEntity> {
  public async createOne(
    createDto: CreateCoinHistoryRecordDto,
  ): Promise<CoinHistoryRecordEntity> {
    const entity = this.create(createDto);

    await this.save(entity);

    return entity;
  }

  public async updateOne(
    id: number,
    updateDto: CreateCoinHistoryRecordDto,
  ): Promise<CoinHistoryRecordEntity> {
    await this.update(id, updateDto);

    return this.getOne(id);
  }

  private async getOne(id: number): Promise<CoinHistoryRecordEntity> {
    const entity = await this.findOne({
      where: { id },
      relations: ['coin'],
    });

    if (!entity) {
      return null;
    }

    return entity;
  }
}
