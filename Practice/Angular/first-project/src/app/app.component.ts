import { Component, OnInit } from '@angular/core';
import { IProduct } from './models/product';
import { ProductsService } from './services/products.service';
import { Observable, tap } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'first-project';

  loading = false;
  // products: IProduct[] = [];
  products$: Observable<IProduct[]>;

  constructor(private productsService: ProductsService) {}

  ngOnInit() {
    this.loading = true;
    this.products$ = this.productsService.getAll().pipe(
      tap(() => {
        this.loading = false;
      })
    );

    // this.productsService.getAll().subscribe((products) => {
    //   this.products = products;
    //   this.loading = false;
    // });
  }
}
