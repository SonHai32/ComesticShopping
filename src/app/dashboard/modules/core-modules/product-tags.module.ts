import { ProductTagsCompModule } from './../comp-modules/product-tags-comp/product-tags-comp.module';
import { ProductTagsRoutingModule } from './../../routing/product-tags-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [],
  imports: [CommonModule, ProductTagsRoutingModule, ProductTagsCompModule],
})
export class ProductTagsModule {}
