import { NzTableModule } from 'ng-zorro-antd/table';
import { ReactiveFormsModule } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { ProductGroupsComponent } from './../../../components/product-groups/product-groups.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [ProductGroupsComponent],
  imports: [
    CommonModule,
    NzTypographyModule,
    NzGridModule,
    NzIconModule,
    NzButtonModule,
    NzInputModule,
    NzFormModule,
    NzTableModule,
    ReactiveFormsModule,
  ],
  exports: [ProductGroupsComponent],
})
export class ProductGroupCompModule {}
