import { Component, OnInit } from '@angular/core';
import { config } from 'rxjs';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {

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

  data = [1,1,1,1,1,1,1,1,1,1,1,1];
  page =Math.floor( this.data.length / 12) + 1 * 10;
  array = [1, 2, 3, 4];
  change(evt: any){
    console.log(evt)
  }
  constructor() {}

  ngOnInit(): void {
    console.log(this.page)
  }
}
