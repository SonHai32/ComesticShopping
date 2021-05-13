import { OwlOptions } from 'ngx-owl-carousel-o';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/models/product.model';
import { ClassGetter } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  product = new Product
  selectImageIndex = 0;
  rate: number = 4;
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

  constructor(private route: ActivatedRoute, private prod: ProductService) { }

  ngOnInit(): void {
    this.getRoutePro(parseInt(this.route.snapshot.params['product_id'], 10))
  }

  getRoutePro(productID: number){
    this.prod.searchProducts(productID ?  {'product_id': productID} : null).subscribe((data: any) =>{
      this.product = data['products'][0]
    })
  }

  changeSelectImageIndex(index: number){
   this.selectImageIndex = index;
  }


}
