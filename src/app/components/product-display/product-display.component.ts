import { take, map, tap } from 'rxjs/operators';
import { ProductResponse } from '../../models/product-response.model';
import { ProductService } from 'src/app/services/product.service';
import { Observable } from 'rxjs';
import { Product } from '../../models/product.model';
import { Component, OnInit, Input } from '@angular/core';
import { ProductDisplay } from 'src/app/models/product-display.model';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-product-display',
  templateUrl: './product-display.component.html',
  styleUrls: ['./product-display.component.scss'],
})
export class ProductDisplayComponent implements OnInit {
  constructor(private productService: ProductService) {}
  // tslint:disable-next-line: no-input-rename
  @Input('productDisplay') productDisplay: ProductDisplay = {
    display_type: 'grid',
    productDisplayWithTag: 'all',
    title: {
      content: 'Tất cả sản phẩm',
      color: '#000000',
      background: '#7fffd4'
    },
  };
  productResposne!: Observable<ProductResponse>;

  customOptions: OwlOptions = {
    loop: true,
    autoplay: true,
    autoWidth: true,
    mouseDrag: true,
    touchDrag: true,
    dots: false,
    startPosition: 1,
    navSpeed: 500,
    autoplayTimeout: 2500,
    center: false,
    navText: ['<<<', '>>>'],
    responsive: {
      0: {
        items: 1,
      },
      576: {
        items: 2,
      },
      768: {
        items: 3,
      },
      992: {
        items: 4,
      },
      1200: {
        items: 5,
      },
      1600: {
        items: 5,
      },
    },
    nav: true,
  };

  ngOnInit(): void {
    this.getProductResult(1);
  }
  handlePageIndexChange(pageIndex: number): void {
    this.getProductResult(pageIndex);
  }

  getProductResult(page: number): void {
    this.productResposne = this.productService
      .getProducts(
        this.productDisplay.productDisplayWithTag === 'all'
          ? { page, perPage: 8 }
          : { tag: this.productDisplay.productDisplayWithTag }
      )
      .pipe(
        take(1),
        tap((res) => {
          console.log(res);
        }),
        map((res) => res as ProductResponse)
      );
  }
}
