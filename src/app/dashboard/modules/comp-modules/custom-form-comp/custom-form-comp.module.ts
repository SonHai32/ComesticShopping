import { ReactiveFormsModule } from '@angular/forms';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzFormModule } from 'ng-zorro-antd/form';
import { CustomFormComponent } from '../../../components/form/custom-form.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [CustomFormComponent],
  imports: [
    CommonModule,
    NzFormModule,
    NzInputModule,
    NzGridModule,
    NzTypographyModule,
    NzIconModule,
    NzButtonModule,
    NzToolTipModule,
    ReactiveFormsModule,
  ],
  exports: [CustomFormComponent]
})
export class CustomFormCompModule { }
