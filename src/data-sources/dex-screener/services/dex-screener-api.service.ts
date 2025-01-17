import axios from 'axios';
import { Injectable, Logger } from '@nestjs/common';
import { DexScreenerResponse } from '../interfaces/response.interface';
import { SOURCE_API_URL } from 'src/shared/constants';

@Injectable()
export class DexScreenerApiService {
  private _logger = new Logger(DexScreenerApiService.name);
  private readonly BASE_URL = SOURCE_API_URL.dex_screener;
  private readonly BASE_URL_RC = SOURCE_API_URL.rug_check;

  /**
   * Get the latest token profiles (rate-limit 60 requests per minute)
   * Fetch the latest token profiles.
   * @returns Array of token profiles.
   */
  private async getLatestTokenProfiles(): Promise<any> {
    try {
      const response = await axios.get(
        `${this.BASE_URL}/token-profiles/latest/v1`,
      );
      return response.data;
    } catch (error: any) {
      this._logger.error(
        'Error fetching the latest token profiles:',
        error.message,
      );
      throw error;
    }
  }

  /**
   * Get the latest boosted tokens (rate-limit 60 requests per minute)
   * Fetch the latest boosted tokens.
   * @returns Array of boosted tokens.
   */
  private async getLatestBoostedTokens(): Promise<any> {
    try {
      const response = await axios.get(
        `${this.BASE_URL}/token-boosts/latest/v1`,
      );
      return response.data;
    } catch (error: any) {
      this._logger.error(
        'Error fetching the latest boosted tokens:',
        error.message,
      );
      throw error;
    }
  }

  /**
   * Get the tokens with most active boosts (rate-limit 60 requests per minute)
   * Fetch the tokens with the most active boosts.
   * @returns Array of tokens with active boosts.
   */
  private async getTopBoostedTokens(): Promise<any> {
    try {
      const response = await axios.get(`${this.BASE_URL}/token-boosts/top/v1`);
      return response.data;
    } catch (error: any) {
      this._logger.error(
        'Error fetching tokens with active boosts:',
        error.message,
      );
      throw error;
    }
  }

  /**
   * Check orders paid for of token (rate-limit 60 requests per minute)
   * Check orders for a token by chain and token address.
   * @param chainId Chain ID (e.g., 'solana').
   * @param tokenAddress Token address.
   * @returns Array of orders.
   */
  private async getTokenOrders(
    chainId: string,
    tokenAddress: string,
  ): Promise<any> {
    try {
      const response = await axios.get(
        `${this.BASE_URL}/orders/v1/${chainId}/${tokenAddress}`,
      );
      return response.data;
    } catch (error: any) {
      this._logger.error('Error fetching token orders:', error.message);
      throw error;
    }
  }

  /**
   * Get one or multiple pairs by chain and pair address (rate-limit 300 requests per minute)
   * Fetch one or multiple pairs by chain and pair address.
   * @param chainId The chain ID (e.g., 'solana').
   * @param pairId The pair ID.
   * @returns Pair data.
   */
  public async GetOneOrMultiplePairsByChainAndPairAddress(
    chainId: string,
    pairId: string,
  ): Promise<DexScreenerResponse> {
    try {
      const response = await axios.get(
        `${this.BASE_URL}/latest/dex/pairs/${chainId}/${pairId}`,
      );
      return response.data;
    } catch (error: any) {
      this._logger.error(
        `Error fetching pairs for chainId ${chainId} and pairId ${pairId}:`,
        error.message,
      );
      throw error;
    }
  }

  /**
   * Get one or multiple pairs by token address (rate-limit 300 requests per minute)
   * Fetch one or multiple pairs by token address.
   * @param tokenAddresses Comma-separated token addresses (up to 30).
   * @returns Pair data.
   */
  public async GetOneOrMultiplePairsByTokenAddress(
    tokenAddresses: string,
  ): Promise<DexScreenerResponse> {
    try {
      const response = await axios.get(
        `${this.BASE_URL}/latest/dex/tokens/${tokenAddresses}`,
      );
      return response.data;
    } catch (error: any) {
      this._logger.error(
        `Error fetching pairs for token addresses ${tokenAddresses}:`,
        error.message,
      );
      throw error;
    }
  }

  /**
   * Search for pairs matching a query.
   * @param query The search query.
   * @returns Array of matching pairs.
   */
  private async searchPairsByQuery(query: string): Promise<any> {
    try {
      const response = await axios.get(`${this.BASE_URL}/latest/dex/search`, {
        params: { q: query },
      });
      return response.data;
    } catch (error: any) {
      this._logger.error(
        `Error searching pairs for query "${query}":`,
        error.message,
      );
      throw error;
    }
  }
}
