import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ErrorService {
  error$ = new Subject();

  constructor() {}

  handle(message: string) {
    this.error$.next(message);
  }

  clear() {
    this.error$.next('');
  }
}
