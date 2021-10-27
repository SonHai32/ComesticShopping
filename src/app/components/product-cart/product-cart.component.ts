import { Product } from './../../models/product.model';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-cart',
  templateUrl: './product-cart.component.html',
  styleUrls: ['./product-cart.component.scss'],
})
export class ProductCartComponent implements OnInit {
  // tslint:disable-next-line: no-input-rename
  @Input('product') product!: Product;
  constructor() {}

  ngOnInit(): void {}
}
