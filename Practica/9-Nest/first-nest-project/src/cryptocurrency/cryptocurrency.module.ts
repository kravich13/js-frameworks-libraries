import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CryptocurrencyController } from './cryptocurrency.controller';
import { CryptocurrencyService } from './cryptocurrency.service';
import {
  Cryptocurrency,
  CryptocurrencySchema,
} from './schemas/cryptocurrency.schema';

@Module({
  providers: [CryptocurrencyService],
  controllers: [CryptocurrencyController],
  imports: [
    MongooseModule.forFeature([
      { name: Cryptocurrency.name, schema: CryptocurrencySchema },
    ]),
  ],
})
export class CryptocurrencyModule {}
