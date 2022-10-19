import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CryptocurrencyModule } from './cryptocurrency/cryptocurrency.module';

@Module({
  imports: [
    CryptocurrencyModule,
    MongooseModule.forRoot(
      'mongodb+srv://kravich:TestDataBase@cluster0.bdai7.mongodb.net/first-nest-project?retryWrites=true&w=majority',
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
