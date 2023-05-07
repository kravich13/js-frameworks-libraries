import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalService } from 'src/app/services/modal.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss'],
})
export class CreateProductComponent implements OnInit {
  constructor(
    private productService: ProductsService,
    private modalService: ModalService
  ) {}

  ngOnInit() {}

  form = new FormGroup({
    title: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });

  get title() {
    return this.form.controls.title;
  }

  submit() {
    console.log('tut');
    this.productService
      .create({
        title: this.form.value.title || '',
        price: 13,
        description: 'qq',
        category: 'pih',
        image: 'https://i.pravatar.cc',
        rating: { count: 13, rate: 100 },
      })
      .subscribe(() => this.modalService.close());
  }
}
