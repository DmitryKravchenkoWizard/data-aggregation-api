import { ICoin } from './coin.interface';

export interface IChain {
  id: number; // Primary key
  name: string; // Name of the blockchain (e.g., Solana, Ethereum)
}
