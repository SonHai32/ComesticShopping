import { DisplayListWithPropertyModule } from './../../../../../helpers/pipes/display-list-with-property/display-list-with-property.module';
import { NzAffixModule } from 'ng-zorro-antd/affix';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzSliderModule } from 'ng-zorro-antd/slider';
import { RouterModule } from '@angular/router';
import { NzInputModule } from 'ng-zorro-antd/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzImageModule } from 'ng-zorro-antd/image';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzGridModule } from 'ng-zorro-antd/grid';
import {  ProductListComponent} from '../../../../components/products/product-list/product-list.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [ProductListComponent],
  imports: [
    CommonModule,
    RouterModule,
    NzGridModule,
    NzTypographyModule,
    NzButtonModule,
    NzIconModule,
    NzTableModule,
    NzImageModule,
    NzModalModule,
    NzToolTipModule,
    NzModalModule,
    NzFormModule,
    NzSelectModule,
    FormsModule,
    NzPopoverModule,
    NzSliderModule,
    NzInputModule,
    NzAffixModule,
    ReactiveFormsModule,
    DisplayListWithPropertyModule,
  ],
  exports: [ProductListComponent]
})
export class ProductCompModule { }
