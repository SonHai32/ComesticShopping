import { DashboardComponent } from './dashboard.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    data: {
      breadcrumb: 'Dashboard',
    },
    children: [
      {
        path: 'products',
        loadChildren: () =>
          import('./modules/core-modules/product.module').then(
            (m) => m.ProductModule
          ),
        data: {
          breadcrumb: 'Products',
        },
      },
      {
        path: 'categories',
        loadChildren: () =>
          import('./modules/core-modules/category.module').then(
            (m) => m.CategoryModule
          ),
        data: {
          breadcrumb: 'Categories',
        },
      },
      {
        path: 'edit-home',
        loadChildren: () =>
          import('./modules/core-modules/edit-home.module').then(
            (m) => m.EditHomeModule
          ),
        data: {
          breadcrumb: 'Home edit',
        },
      },
      {
        path: 'product-tags',
        loadChildren: () =>
          import('./modules/core-modules/product-tags.module').then(
            (m) => m.ProductTagsModule
          ),
        data: {
          breadcrumb: 'Product tags',
        },
      },
      {
        path: 'product-groups',
        loadChildren: () =>
          import('./modules/core-modules/product-groups.module').then(
            (m) => m.ProductGroupsModule
          ),
        data: {
          breadcrumb: 'Product groups',
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
