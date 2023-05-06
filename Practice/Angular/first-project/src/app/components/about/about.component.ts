import { Component, Input } from '@angular/core';
import { IProduct } from '../../models/product';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})
export class AboutComponent {
  @Input() product: IProduct;

  details = false;
}
