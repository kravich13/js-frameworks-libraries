import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CryptocurrencyService } from './cryptocurrency.service';
import { CreateCoinDto } from './dto/create-coin.dto';

@Controller('cryptocurrency')
export class CryptocurrencyController {
  constructor(private readonly cryptocurrencyService: CryptocurrencyService) {}

  @Get()
  getCoins() {
    return this.cryptocurrencyService.getAll();
  }

  @Get(':id')
  getCoin(@Param('id') id: string) {
    return `Ticker: ${this.cryptocurrencyService.getById(id)}`;
  }

  @Post()
  addCoin(@Body() createCoin: CreateCoinDto) {
    return this.cryptocurrencyService.create(createCoin);
  }

  @Delete(':id')
  deleteCoin(@Param('id') id: string) {
    return this.cryptocurrencyService.remove(id);
  }
}
