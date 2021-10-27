import { ProductRoutingModule } from '../../routing/product-routing.module';
import { ProductCompModule } from '.././comp-modules/products/product-list-comp/product-list-comp.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCreateCompModule } from '.././comp-modules/products/product-form-comp/product-form-comp.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ProductRoutingModule,
    ProductCompModule,
    ProductCreateCompModule,
  ],
})
export class ProductModule {}
