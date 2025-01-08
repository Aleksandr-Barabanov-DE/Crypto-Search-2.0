export interface Link {
  to: string;
  label: string;
}
export interface Crypto {
  id: string;
  rank: string;
  name: string;
  symbol: string;
  priceUsd: string;
  changePercent24Hr: string;
  marketCapUsd: string;
  volumeUsd24Hr: string;
  supply?: number;
  maxSupply?: string;
}

export interface CryptoContextProps {
  cryptoData: Crypto[];
  loading: boolean;
  error: string | null;
  isLocalStorageEnabled: boolean | undefined;
  setLocalStorageEnabled: React.Dispatch<
    React.SetStateAction<boolean | undefined>
  >;
}

export interface MultipleSelectCheckmarksProps {
  selectedIds: string[];
  setSelectedIds: React.Dispatch<React.SetStateAction<string[]>>;
  recievedData: Crypto[];
  setRecievedData: React.Dispatch<React.SetStateAction<Crypto[]>>;
  isSearched: boolean;
  setIsSearched: React.Dispatch<React.SetStateAction<boolean>>;
  setIsCryptoSearch: React.Dispatch<React.SetStateAction<boolean>>;
  setIsExchangeSearch: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface ApiCandleData {
  open: string;
  high: string;
  low: string;
  close: string;
  volume: string;
  period: number;
}

export interface CandleData {
  o: number;
  h: number;
  l: number;
  c: number;
  x: number;
}

export interface CandlestickChartProps {
  apiData: ApiCandleData[];
}

export interface CryptoCardProps {
  crypto: Crypto;
}

export interface Exchange {
  exchangeId: string;
  name: string;
  rank: string;
  tradingPairs: string;
  volumeUsd: string;
  percentTotalVolume: string;
  updated: number;
  exchangeUrl: string;
}

export interface ExchangeSelectProps {
  selectedExchanges: string[];
  setSelectedExchanges: React.Dispatch<React.SetStateAction<string[]>>;
  setExchangeData: React.Dispatch<React.SetStateAction<Exchange[]>>;
  setIsExchangeSearch: React.Dispatch<React.SetStateAction<boolean>>;
  setIsCryptoSearch: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface ExchangeItemProps {
  exchange: Exchange;
}
