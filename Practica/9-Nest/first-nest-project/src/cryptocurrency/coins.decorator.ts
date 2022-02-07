import { SetMetadata } from '@nestjs/common';

export const Roles = (...coins: string[]) => SetMetadata('coins', coins);
