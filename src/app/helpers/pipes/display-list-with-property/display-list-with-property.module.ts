import { DisplayListWithPropertyPipe } from './display-list-with-property.pipe';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [DisplayListWithPropertyPipe],
  imports: [
    CommonModule
  ],
  exports: [DisplayListWithPropertyPipe]
})
export class DisplayListWithPropertyModule { }
