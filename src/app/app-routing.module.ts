import { CommonModule } from '@angular/common';
import { DefaultRoutingModule } from './modules/default-routing/default-routing.module';
import { LoginGuard } from './helpers/guard/login.guard';
import { AuthComponent } from './components/auth/auth.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/default/product', pathMatch: 'full' , data: {breadcrumb: 'Home'}},
  { path: 'auth', canActivate: [LoginGuard], component: AuthComponent },
  {
    path: 'dashboard',
    data: {breadcrumb: 'Dashboard'},
    loadChildren: () => import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes), DefaultRoutingModule, CommonModule],
  exports: [RouterModule],
})
export class AppRoutingModule {}
