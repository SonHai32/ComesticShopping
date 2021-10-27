import { ProductTagsComponent } from './../components/product-tags/product-tags.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: ProductTagsComponent,
    data: {
      breadcrumb: 'Product tags',
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductTagsRoutingModule {}
