import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  breadCrumbList!: string[];
  subscriptions: Subscription = new Subscription();
  pageHeaderTitle: string = '';
  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    // this.breadCrumbList = this.router.url.trim().split('/').filter(val => val !== '')
    // this.activatedRoute.data.subscribe(val => console.log(val))
    this.activatedRoute.firstChild?.data.subscribe((val) => console.log(val));
    this.subscriptions.add(
      this.activatedRoute.url.subscribe((data: any) => {
        this.activatedRoute.data.subscribe((val) => console.log(val));
        const path: string[] = this.router.url.split('/');
        const lastPath: string = path[path.length - 1];
        const prevLastPath: string = path[path.length - 2];
        if (prevLastPath === 'Product' && lastPath === 'List') {
          this.pageHeaderTitle = 'Danh sách sản phẩm';
        } else if (prevLastPath.includes('Product') && lastPath === 'Create') {
          this.pageHeaderTitle = 'Thêm sản phẩm';
        } else if (prevLastPath.includes('Product') && lastPath === 'Edit') {
          this.pageHeaderTitle = 'Chỉnh sửa sản phẩm';
        }
      })
    );
  }
}
