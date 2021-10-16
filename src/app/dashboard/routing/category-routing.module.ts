import { CategoryListComponent } from '../components/categories/category-list/category-list.component';
import { CategoryCreateComponent } from '../components/categories/category-form/category-form.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'list',
      },
      {
        path: 'list',
        component: CategoryListComponent,
        data: { breadcrumb: 'List' },
      },
      {
        path: 'form',
        data: {
          breadcrumb: 'Category Form',
        },
        children: [
          {
            path: '',
            pathMatch: 'full',
            redirectTo: 'create',
          },
          {
            path: 'create',
            component: CategoryCreateComponent,
            data: {
              braedcrumb: 'Create',
            },
          },
          {
            path: 'edit/:id',
            component: CategoryCreateComponent,
            data: {
              braedcrumb: 'Edit',
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
export class CategoryRoutingModule {}
