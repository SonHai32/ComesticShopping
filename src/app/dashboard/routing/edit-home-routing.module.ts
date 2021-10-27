import { EditHomeComponent } from './../components/edit-home/edit-home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{
  path: '',
  component: EditHomeComponent,
  data: {
    brealcrumb: 'Home edit'
  }
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditHomeRoutingModule { }
