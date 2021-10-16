import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { ProductCreateCompModule } from './modules/comp-modules/products/product-form-comp/product-form-comp.module';
import { ProductRoutingModule } from './routing/product-routing.module';
import { ProductCompModule } from './modules/comp-modules/products/product-list-comp/product-list-comp.module';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzAffixModule } from 'ng-zorro-antd/affix';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { MenuCompModule } from './modules/comp-modules/menu-comp/menu-comp.module';
import { DashboardComponent } from './dashboard.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';


@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    // ProductRoutingModule,
    DashboardRoutingModule,
    MenuCompModule,
    // ProductCompModule,
    // ProductCreateCompModule,
    NzGridModule,
    NzAffixModule,
    NzLayoutModule,
    NzTypographyModule,
    NzIconModule,
    NzBreadCrumbModule,
  ],
  exports: [DashboardComponent]
})
export class DashboardModule { }
