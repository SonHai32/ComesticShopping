import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzMessageService, NzMessageModule } from 'ng-zorro-antd/message';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzTableModule } from 'ng-zorro-antd/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { ProductGroupsComponent } from './../../../components/product-groups/product-groups.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzRadioModule } from 'ng-zorro-antd/radio';

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
    NzModalModule,
    NzMessageModule,
    NzRadioModule,
    NzBadgeModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  exports: [ProductGroupsComponent],
})
export class ProductGroupCompModule {}
