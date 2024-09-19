import axios from "axios";

const apiUrl = "https://api.binance.com/api/v3/klines";

export default interface KlineData {
  openTime: string;
  open: string;
  high: string;
  low: string;
  close: string;
  volume: string;
  closeTime: number;
  quoteAssetVolume: string;
  numberOfTrades: number;
  takerBuyBaseAssetVolume: string;
  takerBuyQuoteAssetVolume: string;
  ignore: string;
}

export const fetchKlinesData = async (
  interval: string,
  limit = 1440
): Promise<KlineData[]> => {
  try {
    const response = await axios.get(apiUrl, {
      params: {
        symbol: "BTCUSDT",
        interval,
        limit,
      },
    });
    
    return response.data.map((data: any[]) => ({
      openTime: data[0],
      open: data[1],
      high: data[2],
      low: data[3],
      close: data[4],
      volume: data[5],
      closeTime: data[6],
      quoteAssetVolume: data[7],
      numberOfTrades: data[8],
      takerBuyBaseAssetVolume: data[9],
      takerBuyQuoteAssetVolume: data[10],
      ignore: data[11],
    }));
  } catch (error) {
    console.error("Error fetching klines data:", error);
    return [];
  }
};
