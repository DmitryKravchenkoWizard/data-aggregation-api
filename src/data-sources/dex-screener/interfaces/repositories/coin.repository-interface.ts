import { CreateCoinDto } from "../../dto/in/create-coin.dto";
import { CoinEntity } from "../../entities/coin.entity";

export interface ICoinRepository {
  createOne(createCoinDto: CreateCoinDto): Promise<CoinEntity>;
  updateOne(id: number, updateDto: CreateCoinDto): Promise<CoinEntity>;
}
