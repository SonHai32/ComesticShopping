import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { CustomFormCompModule } from '../../custom-form-comp/custom-form-comp.module';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { ProductCreateComponent } from '../../../../components/products/product-form/product-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzImageModule } from 'ng-zorro-antd/image';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [ProductCreateComponent],
  imports: [
    CommonModule,
    NzFormModule,
    NzInputModule,
    NzTypographyModule,
    NzGridModule,
    NzImageModule,
    NzButtonModule,
    NzIconModule,
    NzPageHeaderModule,
    NzBreadCrumbModule,
    NzMessageModule,
    NzToolTipModule,
    NzSelectModule,
    NzMessageModule,
    FormsModule,
    ReactiveFormsModule,
    CustomFormCompModule,
  ],
  exports:[ProductCreateComponent]
})
export class ProductCreateCompModule { }
