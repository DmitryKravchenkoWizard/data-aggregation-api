import { CoinRepository } from "./repositories/coin.repository";
import { HistoryRepository } from "./repositories/coin-history-record.repository";
import { DexScreenerApiService } from "./services/dex-screener-api.service";
import { DexScreenerUpdateService } from "./services/dex-screener-update.service";


export const DEX_SCREENER_PROVIDERS = [DexScreenerApiService, DexScreenerUpdateService];
export const DEX_SCREENER_REPOSITORIES = [CoinRepository, HistoryRepository]
