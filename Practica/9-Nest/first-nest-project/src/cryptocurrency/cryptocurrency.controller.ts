import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { Roles } from './coins.decorator';
import { CryptocurrencyGuard } from './cryptocurrency.guard';
import { CryptocurrencyService } from './cryptocurrency.service';
import { CreateCoinDto } from './dto/create-coin.dto';

@Controller('cryptocurrency')
export class CryptocurrencyController {
  constructor(private readonly cryptocurrencyService: CryptocurrencyService) {}

  @Get()
  @UseGuards(CryptocurrencyGuard)
  getCoins() {
    return this.cryptocurrencyService.getAll();
  }

  @Get(':id')
  getCoin(@Param('id') id: string) {
    return this.cryptocurrencyService.getById(id);
  }

  @Post()
  @Roles('BTC', 'ETH')
  @UseGuards(CryptocurrencyGuard)
  addCoin(@Body() createCoin: CreateCoinDto) {
    return this.cryptocurrencyService.create(createCoin);
  }

  @Delete(':id')
  deleteCoin(@Param('id') id: string) {
    return this.cryptocurrencyService.remove(id);
  }
}
