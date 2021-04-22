import { BannerComponent } from './banner/banner.component';
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
    BannerComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FlexLayoutModule,
    IconModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    NavbarComponent,
    BannerComponent
  ]

})
export class ShareModule { }
