import { ProductService } from './../../services/product.service';
import { Product } from './../../models/product.model';
import { Component, OnInit } from '@angular/core';
import { config } from 'rxjs';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  productData:  Product[] = []

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
        items: 1
      },
      576: {
        items: 2
      },
      768: {
        items: 3
      },
      992: {
        items: 4
      },
      1200:{
        items: 5
      },
      1600:{
        items: 5
      },

    },
    nav: true
  }

  page = 0
  total_result = 0
  entries_per_page=12
  array = [1, 2, 3, 4]
  change(evt: any){
    console.log(evt)
  }
  constructor(private prod: ProductService) {}

  ngOnInit(): void {
    this.getAll()
  }
  getAll(){
    this.prod.getProducts(null).subscribe((data: any) =>{
      this.productData = data['products']
      this.page = data['page']
      this.entries_per_page = data['entries_per_page']
      this.total_result = data['total_result']
    })
  }
}
