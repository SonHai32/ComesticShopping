import { EditHomeCompModule } from '../comp-modules/edit-home-comp/edit-home-comp.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditHomeRoutingModule } from '../../routing/edit-home-routing.module';
import {} from '@angular/cdk/drag-drop';

@NgModule({
  declarations: [],
  imports: [CommonModule, EditHomeRoutingModule, EditHomeCompModule],
})
export class EditHomeModule {}
