import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { EditHomeToolboxCompModule } from './../edit-home-toolbox-comp/edit-home-toolbox-comp.module';
import { EditHomeComponent } from '../../../components/edit-home/edit-home.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [EditHomeComponent],
  imports: [
    CommonModule,
    EditHomeToolboxCompModule,
    DragDropModule,
    NzGridModule,
    NzTypographyModule,
    NzIconModule,
    NzModalModule,
    NzButtonModule,
  ],
  exports: [EditHomeComponent],
})
export class EditHomeCompModule {}
