import { Component, OnInit } from '@angular/core';
import {NzDatePickerModule} from 'ng-zorro-antd/date-picker'
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  navItems: any;
  constructor() {
    this.navItems = [
      {name: 'Trang chủ', path: '/'},
      {name: 'Giới thiệu', path: 'gioi-thieu'},
      {name: 'Hỗ trợ', path: 'ho-tro'},
      {name: 'Liên hệ', path: 'lien-he'},

    ]
   }

  ngOnInit(): void {
  }

}
