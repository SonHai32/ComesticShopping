import { Component, OnInit } from '@angular/core';
import { config } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
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
