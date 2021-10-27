import { ProductGroupsComponent } from './../components/product-groups/product-groups.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: ProductGroupsComponent,
    data: {
      breadcrumb: 'Product-groups',
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductGroupsRoutingModule {}
