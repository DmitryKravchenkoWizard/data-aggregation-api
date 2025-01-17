export interface ICoinInfo {
  coinId: number;
  url?: string;
  imageUrl?: string;
  header?: string;
  openGraph?: string;
  description?: string;
  websites?: string;
  twitter?: string;
  telegram?: string;
  meta?: Record<string, string>;
}
