import { NzFormModule } from 'ng-zorro-antd/form';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { CustomFormCompModule } from '../custom-form-comp/custom-form-comp.module';
import { CategoryCreateComponent } from '../../../components/categories/category-form/category-form.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzSelectModule } from 'ng-zorro-antd/select';



@NgModule({
  declarations: [CategoryCreateComponent],
  imports: [
    CommonModule,
    CustomFormCompModule,
    NzInputModule,
    NzIconModule,
    NzButtonModule,
    NzGridModule,
    NzSelectModule,
    NzModalModule,
    NzFormModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  exports: [CategoryCreateComponent]
})
export class CategoryCreateCompModule { }
