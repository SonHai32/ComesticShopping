import { ProductGroupCompModule } from './../comp-modules/product-group-comp/product-group-comp.module';
import { ProductGroupsRoutingModule } from './../../routing/product-groups-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [],
  imports: [CommonModule, ProductGroupsRoutingModule, ProductGroupCompModule],
})
export class ProductGroupsModule {}
