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
          import('./modules/product.module').then((m) => m.ProductModule),
        data: {
          breadcrumb: 'Products'
        }
      },
      {
        path: 'categories',
        loadChildren: () => import('./modules/category.module').then((m) => m.CategoryModule),
        data: {
          breadcrumb: 'Categories'
        }
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
