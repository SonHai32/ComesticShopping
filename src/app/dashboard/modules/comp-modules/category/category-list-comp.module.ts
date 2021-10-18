import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { RouterModule } from '@angular/router';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { CategoryListComponent } from '../../../components/categories/category-list/category-list.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzGridModule } from 'ng-zorro-antd/grid';

@NgModule({
  declarations: [CategoryListComponent],
  imports: [
    CommonModule,
    RouterModule,
    NzGridModule,
    NzButtonModule,
    NzTypographyModule,
    NzIconModule,
    NzTableModule,
    NzMessageModule,
    NzModalModule,
  ],
  exports: [CategoryListComponent],
})
export class CategoryListCompModule {}
