import { Injectable } from '@nestjs/common';
import { CreateCoinDto } from './dto/create-coin.dto';

@Injectable()
export class CryptocurrencyService {
  private coins = [];

  getAll() {
    return this.coins;
  }

  getByTicker(ticker: string) {
    return this.coins.find((coin) => coin.ticker === ticker);
  }

  create(coinData: CreateCoinDto) {
    this.coins.push({ id: Date.now().toString(), ...coinData });
    return `${coinData.ticker} was created`;
  }
}
