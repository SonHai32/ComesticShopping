import { Component, OnInit } from '@angular/core';
import { config } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  data = [1, 2, 3, 4, 4, 5, 5, 5, 5, 51,32,3,3,3,33,3,3,3,3,3,];
  page =Math.floor( this.data.length / 12) + 1 * 10;
  change(evt: any){
    console.log(evt)
  }
  constructor() {}

  ngOnInit(): void {
    console.log(this.page)
  }
}
