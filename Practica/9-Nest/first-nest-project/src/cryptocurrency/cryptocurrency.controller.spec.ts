import { Test, TestingModule } from '@nestjs/testing';
import { CryptocurrencyController } from './cryptocurrency.controller';

describe('CryptocurrencyController', () => {
  let controller: CryptocurrencyController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CryptocurrencyController],
    }).compile();

    controller = module.get<CryptocurrencyController>(CryptocurrencyController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
