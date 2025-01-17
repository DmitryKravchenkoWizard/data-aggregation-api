import { OmitType } from '@nestjs/swagger';
import { CoinHistoryRecordDto } from '../coin-history-record.dto';

export class CreateCoinHistoryRecordDto extends OmitType(CoinHistoryRecordDto, [
  'id',
  'created_at',
  'updated_at'
]) {
} 
