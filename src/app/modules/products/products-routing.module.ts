import { DefaultComponent } from './../../components/default/default.component';
import { HeaderComponent } from './../../components/share/header/header.component';
import { ProductDetailComponent } from './../../components/product-detail/product-detail.component';
import { ProductsComponent } from './../../components/products/products.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


const productRoutes: Routes = [
  {
    path: 'product',
    component: DefaultComponent,
    children: [
      {
        path: '',
        component: ProductsComponent
      },
      {
        path: 'category/:category_id',
        component: ProductsComponent
      },
      {
        path: 'product-detail/:product_id',
        component: ProductDetailComponent
      }
    ]
  }
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(productRoutes)
  ],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
