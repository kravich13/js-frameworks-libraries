import { Component, OnInit } from '@angular/core';
import { ModalService } from 'src/app/services/modal.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss'],
})
export class ProductPageComponent implements OnInit {
  title = 'first-project';

  term = '';

  loading = false;
  // products: IProduct[] = [];
  // products$: Observable<IProduct[]>;

  constructor(
    public productsService: ProductsService,
    public modalService: ModalService
  ) {}

  ngOnInit() {
    this.loading = true;

    // this.products$ = this.productsService.getAll().pipe(
    //   tap(() => {
    //     this.loading = false;
    //   })
    // );

    this.productsService.getAll().subscribe(() => {
      this.loading = false;
    });
  }
}
