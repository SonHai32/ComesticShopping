import { ProductDisplay } from './../../../models/product-display.model';
import { ColLayout } from './../../models/col-layout.model';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { RowLayout } from './../../models/row-layout.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-home',
  templateUrl: './edit-home.component.html',
  styleUrls: ['./edit-home.component.scss'],
})
export class EditHomeComponent implements OnInit {
  rows: ProductDisplay[] = [
    {
      display_type: 'grid',
      productDisplayWithTag: 'all',
      title: {
        content: 'Tất cả sản phẩm',
        background: '#000000',
        color: '#ffffff'
      }
    },
  ];
  onDragDrop(item: CdkDragDrop<RowLayout | ColLayout | any>) {
    console.log(item.container.data);
  }
  constructor() {}
  ngOnInit(): void {}
}
