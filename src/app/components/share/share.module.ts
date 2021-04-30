import { ProductsComponent } from './../products/products.component';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { BannerComponent } from './banner/banner.component';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzCarouselModule } from 'ng-zorro-antd/carousel';
import { IconModule } from './../icon/icon.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HeaderComponent} from './header/header.component';
import {FooterComponent} from './footer/footer.component'
import {NavbarComponent} from './navbar/navbar.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import {RouterModule} from '@angular/router'




@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    NavbarComponent,
    BannerComponent,
    ProductsComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FlexLayoutModule,
    IconModule,
    NzDatePickerModule,
    NzButtonModule,
    NzGridModule,
    NzIconModule,
    NzTypographyModule,
    NzMenuModule,
    NzCardModule,
    NzBreadCrumbModule,
    NzToolTipModule,
    NzPaginationModule,
    NzPageHeaderModule,
    NzCarouselModule,
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    NavbarComponent,
    BannerComponent,
    ProductsComponent
  ]

})
export class ShareModule { }
