import { NzGridModule } from 'ng-zorro-antd/grid';
import { EditHomeToolboxComponent } from './../../../components/edit-home-toolbox/edit-home-toolbox.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';

@NgModule({
  declarations: [EditHomeToolboxComponent],
  imports: [CommonModule, NzGridModule, DragDropModule],
  exports: [EditHomeToolboxComponent],
})
export class EditHomeToolboxCompModule {}
