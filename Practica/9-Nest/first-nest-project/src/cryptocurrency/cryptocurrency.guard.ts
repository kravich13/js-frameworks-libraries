import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

@Injectable()
export class CryptocurrencyGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const coins = this.reflector.get<string[]>('coins', context.getHandler());
    const { body } = context.switchToHttp().getRequest();

    if (coins.includes(body.ticker)) {
      return true;
    }

    return false;
  }
}
