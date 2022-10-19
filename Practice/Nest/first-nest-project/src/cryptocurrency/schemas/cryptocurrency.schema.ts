import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CryptocurrencyDocument = Cryptocurrency & Document;

@Schema()
export class Cryptocurrency {
  @Prop()
  ticker: string;

  @Prop()
  fullName: string;

  @Prop()
  price: number;
}

export const CryptocurrencySchema =
  SchemaFactory.createForClass(Cryptocurrency);
