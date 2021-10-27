import { ToolBox } from './../../types/tool-box.type';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-home-toolbox',
  templateUrl: './edit-home-toolbox.component.html',
  styleUrls: ['./edit-home-toolbox.component.scss'],
})
export class EditHomeToolboxComponent implements OnInit {
  // tools = ['Thêm hàng', 'Thêm cột', 'Hình ảnh', 'Tiều để'];
  tools: ToolBox[] = [
    { title: 'Thêm hàng', key: 'add_row' },
    { title: 'Hình ảnh', key: 'add_image' },
    { title: 'Tiêu đề', key: 'add_title' },
  ];

  drop(event: CdkDragDrop<string[]>): void {
    moveItemInArray(this.tools, event.previousIndex, event.currentIndex);
  }
  constructor() {}

  ngOnInit(): void {}
}
