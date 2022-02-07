import { CryptocurrencyGuard } from './cryptocurrency.guard';

describe('CryptocurrencyGuard', () => {
  it('should be defined', () => {
    expect(new CryptocurrencyGuard()).toBeDefined();
  });
});
