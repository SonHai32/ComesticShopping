import { CategoryListCompModule } from '../comp-modules/category/category-list-comp.module';
import { CategoryRoutingModule } from '../../routing/category-routing.module';
import { CategoryCreateCompModule } from '../comp-modules/category/category-form-comp.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    CategoryRoutingModule,
    CategoryCreateCompModule,
    CategoryListCompModule,
  ]
})
export class CategoryModule { }
