import { ProductCreateComponent } from '../components/products/product-form/product-form.component';
import { ProductListComponent } from '../components/products/product-list/product-list.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full',
      },
      {
        path: 'list',
        component: ProductListComponent,
        data: {
          breadcrumb: 'List',
        },
      },
      {
        path: 'form',
        data: {
          breadcrumb: 'Product Form'
        },
        children: [
          {
            path: '',
            redirectTo: 'create',
            pathMatch: 'full',
          },
          {
            path: 'create',
            component: ProductCreateComponent,
            data: {
              breadcrumb: 'Create',
            },
          },
          {
            path: 'edit/:id',
            component: ProductCreateComponent,
            data: {
              breadcrumb: 'Edit',
            },
          },
        ],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductRoutingModule {}
