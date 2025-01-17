import { Injectable, Logger } from '@nestjs/common';

import { DexScreenerApiService } from './dex-screener-api.service';
import { CoinRepository } from '../repositories/coin.repository';
import {
  DexScreenerResponse,
  IPair,
} from '../interfaces/response.interface';
// import { RugCheckApiService } from './rug-check-api.service';

import * as fs from 'fs';
import * as path from 'path';
import csvParser from 'csv-parser';
import { HistoryRepository } from '../repositories/coin-history-record.repository';
import { CreateCoinDto } from '../dto/in/create-coin.dto';
import { CreateCoinHistoryRecordDto } from '../dto/in/create-history.dto';

@Injectable()
export class DexScreenerUpdateService {
  private _logger = new Logger(DexScreenerUpdateService.name);

  constructor(
    private readonly _dexScreenerApiService: DexScreenerApiService,
    // private readonly _rugCheckApiService: RugCheckApiService,
    private readonly _coinRepository: CoinRepository,
    private readonly _historyRepository: HistoryRepository,
  ) {}

  public async updateOrCreateCoin(
    chainId: string,
    pairId: string,
  ): Promise<void> {
    const data: DexScreenerResponse =
      await this._dexScreenerApiService.GetOneOrMultiplePairsByChainAndPairAddress(
        chainId,
        pairId,
      );
    // const rugCheckData = await this._rugCheckService.getTokenReport(pairId);

    const pair = data.pairs.length ? data.pairs[0] : null;
    if (!pair) return;

    const coin = await this._coinRepository.findOne({
      where: { pair_key: pairId },
    });

    const coinDto = this.preparedCoinDto(pair);
    const historyDto = this.prepareHistoryDto(pair);

    if (coin && coin.id) {
      this._logger.debug(`Updating coin with id ${coin.id}`);
      const updatedCoin = await this._coinRepository.updateOne(
        coin.id,
        coinDto,
      );
      historyDto.coinId = updatedCoin.id;
      const coinHistory = await this._historyRepository.findOne({
        where: { coin_id: updatedCoin.id },
      });
      if (coinHistory && coinHistory.id) {
        await this._historyRepository.updateOne(coinHistory.id, historyDto);
      } else {
        await this._historyRepository.createOne(historyDto);
      }
    } else {
      const coin = await this._coinRepository.createOne(coinDto);
      historyDto.coinId = coin.id;
      await this._historyRepository.createOne(historyDto);
      this._logger.debug('Creating new coin with pairId:', pairId);
    }
  }

  preparedCoinDto(pair: IPair): CreateCoinDto {
    return {
      chainId: 1, // HardCode for the Solana

      // Token information
      pairKey: pair.pairAddress || null,

      mintKey: pair.baseToken.address,
      mintName: pair.baseToken.name,
      mintSymbol: pair.baseToken.symbol || null,

      quoteKey: pair.quoteToken.address,
      quoteName: pair.quoteToken.name,
      quoteSymbol: pair.quoteToken.symbol || null,

      marketMaker: pair.dexId || null,
      detectedAt: new Date(pair.pairCreatedAt),

      // External links and metadata
      // websiteUrl: pair.info?.websites?.[0]?.url || null,
      // telegramUrl:
      //   pair.info?.socials?.find((social) => social.type === 'telegram')?.url ||
      //   null,
      // meta: pair.info || null, // Include the whole info object as metadata

      // // Token program and creator
      // tokenProgram: null, // Not provided in the response
      // creatorAccount: null, // Not provided in the response

      // // Supply and emission data
      // totalAmount: null, // Not provided in the response
      // baseLockedAmount: null, // Not provided in the response
      // baseBurnedAmount: null, // Not provided in the response
      // holdAmount: null, // Not provided in the response

      // I can get them from RugCheck API:
      // tokenProgram: response.tokenProgram || null, // Mapped from `tokenProgram` in the response
      // creatorAccount: response.creator || null, // Mapped from `creator` in the response
      // totalAmount: response.token?.supply || null, // Mapped from `supply` under `token`
      // baseLockedAmount: response.lp?.lpLocked || null, // Mapped from `lpLocked` under `lp`
      // baseBurnedAmount: null, // Not provided in the response
      // holdAmount: response.lp?.holders?.[0]?.uiAmount || null, // First holder's amount (if relevant)
    };
  }

  prepareHistoryDto(pair: IPair): CreateCoinHistoryRecordDto {
    return {
      coinId: null,
      priceNative: parseFloat(pair.priceNative) || null,
      priceUsd: parseFloat(pair.priceUsd) || null,
      buysTxnsM5: pair?.txns.m5.buys || null,
      buysTxnsH1: pair?.txns.h1.buys || null,
      buysTxnsH6: pair?.txns.h6.buys || null,
      buysTxnsH24: pair?.txns.h24.buys || null,
      sellsTxnsM5: pair?.txns.m5.sells || null,
      sellsTxnsH1: pair?.txns.h1.sells || null,
      sellsTxnsH6: pair?.txns.h6.sells || null,
      sellsTxnsH24: pair?.txns.h24.sells || null,
      volumeM5: pair?.volume.m5 || null,
      volumeH1: pair?.volume.h1 || null,
      volumeH6: pair?.volume.h6 || null,
      volumeH24: pair?.volume.h24 || null,
      priceChangeM5: pair?.priceChange.m5 || null,
      priceChangeH1: pair?.priceChange.h1 || null,
      priceChangeH6: pair?.priceChange.h6 || null,
      priceChangeH24: pair?.priceChange.h24 || null,
      liquidityUsd: pair?.liquidity.usd || null,
      liquidityBase: pair?.liquidity.base || null,
      liquidityQuote: pair?.liquidity.quote || null,
      fdv: pair.fdv || null,
      marketCap: pair.marketCap || null,
    };
  }

  // public async updateAllCoins(): Promise<void> {
  //   await this._rugCheckApiService.saveDomainsCSV();
  // }

  public async readAndLogMints(): Promise<void> {
    try {
      const resourceFolder = path.join(process.cwd(), 'resources');
      const filePath = path.join(resourceFolder, 'domains.csv');

      if (!fs.existsSync(filePath)) {
        console.error(`CSV file not found at ${filePath}`);
        return;
      }

      console.log('Reading CSV file...');

      // Read the CSV file and log each mint
      fs.createReadStream(filePath)
        .pipe(csvParser())
        .on('data', (row) => {
          // Assuming the mint is a column in your CSV
          console.log('Mint:', row['Mint']); // Replace 'mint' with the actual column name
        })
        .on('end', () => {
          console.log('Finished reading CSV file.');
        })
        .on('error', (err) => {
          console.error('Error reading CSV file:', err.message);
        });
    } catch (error: any) {
      console.error('Error processing CSV file:', error.message);
      throw error;
    }
  }

  public async processTokensAndFetchPairs(): Promise<void> {
    const resourceFolder = path.join(process.cwd(), 'resources');
    const filePath = path.join(resourceFolder, 'domains.csv');

    if (!fs.existsSync(filePath)) {
      console.error('CSV file does not exist:', filePath);
      return;
    }

    const tokenAddresses: string[] = [];

    // Step 1: Read the CSV file and collect token addresses
    console.log('Reading token addresses from CSV...');
    fs.createReadStream(filePath)
      .pipe(csvParser())
      .on('data', (row) => {
        const mint = row['Mint'];
        // Assuming the CSV has a column named 'tokenAddress'
        if (mint) {
          tokenAddresses.push(mint.trim());
        }
      })
      .on('end', async () => {
        console.log(
          `Found ${tokenAddresses.length} token addresses. Processing...`,
        );

        // Step 2: Process tokens in chunks
        const chunkSize = 50; // Number of tokens to process in each batch
        const delayBetweenBatches = 60000; // 1 minute delay between batches

        for (let i = 0; i < tokenAddresses.length; i += chunkSize) {
          const chunk = tokenAddresses.slice(i, i + chunkSize);

          console.log(
            `Processing chunk ${i / chunkSize + 1} with ${chunk.length} tokens...`,
          );
          await this.processToken(chunk);

          if (i + chunkSize < tokenAddresses.length) {
            console.log(
              `Waiting ${delayBetweenBatches}ms before processing the next chunk...`,
            );
            await this.delay(delayBetweenBatches);
          }
        }

        // Step 2: Fetch data for each token address
      })
      .on('error', (error) => {
        console.error('Error reading the CSV file:', error.message);
      });
  }

  async processToken(tokenAddresses: string[]): Promise<void> {
    const rateLimit = 300; // 300 RPS
    const delayBetweenRequests = Math.ceil(1000 / rateLimit);
    for (const tokenAddress of tokenAddresses) {
      try {
        const response =
          await this._dexScreenerApiService.GetOneOrMultiplePairsByTokenAddress(
            tokenAddress,
          );
        const pairs = response.pairs;

        if (pairs && pairs.length > 0) {
          this._logger.debug(
            `Processing token=${tokenAddress} with pairs = ${pairs.length}`,
          );
          console.log(
            `Processing token=${tokenAddress} with pairs = ${pairs.length}`,
          );
          pairs.forEach(async (pair: { pairAddress: string }) => {
            console.log(
              `Token Address: ${tokenAddress}, PairId: ${pair.pairAddress}`,
            );
            await this.updateOrCreateCoin('solana', pair.pairAddress);
          });
        } else {
          this._logger.debug(
            `No pairs found for Token Address: ${tokenAddress}`,
          );
          console.log(`No pairs found for Token Address: ${tokenAddress}`);
        }
        this._logger.debug('finished processing token:', tokenAddress);
        console.log('finished processing token:', tokenAddress);
      } catch (error: any) {
        console.error(
          `Error fetching data for Token Address: ${tokenAddress}`,
          error.message,
        );
      }
    }
  }
  async delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
