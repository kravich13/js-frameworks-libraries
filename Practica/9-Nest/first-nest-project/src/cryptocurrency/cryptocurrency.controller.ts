import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CryptocurrencyService } from './cryptocurrency.service';
import { CreateCoinDto } from './dto/create-coin.dto';
import { UpdateCoinDto } from './dto/update-coin.dto';

@Controller('cryptocurrency')
export class CryptocurrencyController {
  constructor(private readonly cryptocurrencyService: CryptocurrencyService) {}

  @Get()
  getCoins() {
    return this.cryptocurrencyService.getAll();
  }

  @Get(':ticker')
  getCoin(@Param('ticker') ticker: string) {
    return `Ticker: ${this.cryptocurrencyService.getByTicker(ticker)}`;
  }

  @Post()
  addCoin(@Body() createCoin: CreateCoinDto) {
    return this.cryptocurrencyService.create(createCoin);
  }

  @Put(':ticker')
  updateCoin(
    @Body() updateCoin: UpdateCoinDto,
    @Param('ticker') ticker: string,
  ) {
    if (ticker.toLocaleUpperCase() === 'ETH') {
      return { ticker: 'ETH', fullName: 'Ethereum', price: updateCoin.price };
    }

    return 'Failed';
  }

  @Delete()
  deleteCoin() {}
}
