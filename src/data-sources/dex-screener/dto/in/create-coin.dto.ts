import { PickType } from '@nestjs/swagger';
import { CoinDto } from '../coin.dto';

export class CreateCoinDto extends PickType(CoinDto, [
  'chainId',
  'pairKey',
  'mintKey',
  'mintName',
  'mintSymbol',
  'quoteKey',
  'quoteSymbol',
  'quoteName',
  'detectedAt',
  'marketMaker'
]) {
} 
