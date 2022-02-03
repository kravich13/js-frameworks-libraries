import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCoinDto } from './dto/create-coin.dto';
import {
  Cryptocurrency,
  CryptocurrencyDocument,
} from './schemas/cryptocurrency.schema';

@Injectable()
export class CryptocurrencyService {
  constructor(
    @InjectModel(Cryptocurrency.name)
    private cryptocurrencyModel: Model<CryptocurrencyDocument>,
  ) {}

  getAll(): Promise<Cryptocurrency[]> {
    return this.cryptocurrencyModel.find().exec();
  }

  getById(id: string): Promise<Cryptocurrency> {
    return this.cryptocurrencyModel.findById(id).exec();
  }

  create(coinDto: CreateCoinDto): Promise<Cryptocurrency> {
    const newCryptocurrency = new this.cryptocurrencyModel(coinDto);
    return newCryptocurrency.save();
  }

  remove(id: string): Promise<Cryptocurrency> {
    return this.cryptocurrencyModel.findByIdAndRemove(id).exec();
  }
}
