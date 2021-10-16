import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

interface DashboardMenu {
  icon: string;
  name: string;
  iconTheme: 'outline' | 'fill' | 'twotone';
  routerLink: string[],
}
@Component({
  selector: 'dashboard-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  isCollapsed: boolean = false;
  menuItemActive: string = 'Dashboard';
  dashboardMenu: DashboardMenu[] = [
    { icon: 'dashboard', name: 'Dashboard', iconTheme: 'outline', routerLink: ['/dashboard'] },
    { icon: 'team', name: 'Khách hàng', iconTheme: 'outline', routerLink: ['/dashboard', 'users'] },
    { icon: 'area-chart', name: 'Phân tích', iconTheme: 'outline', routerLink: ['/dashboard', 'analytics'] },
    { icon: 'shop', name: 'Sản phẩm', iconTheme: 'outline', routerLink: ['/dashboard', 'products']},
    { icon: 'profile', name: 'Danh mục', iconTheme: 'outline', routerLink: ['/dashboard', 'categories'] },
  ];
  constructor(private router: Router) {}

  ngOnInit(): void {}

  itemToggle(itemName: string, routerLink: string[]) {
    if (itemName && routerLink) {
      this.menuItemActive = itemName;
      this.router.navigate(routerLink)
    }
    else return
  }
}
