import { User } from './../../../models/user.model';
import { UserService } from './../../../services/user-service/user.service';
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isLoggedIn = false
  navItems: any;
  constructor(
    private userService: UserService
  ) {
    this.navItems = [
      {name: 'Trang chủ', path: '/'},
      {name: 'Giới thiệu', path: 'gioi-thieu'},
      {name: 'Hỗ trợ', path: 'ho-tro'},
      {name: 'Liên hệ', path: 'lien-he'},

    ]
   }

  ngOnInit(): void {
    this.userService.isLoggedIn().subscribe({
      next: val => this.isLoggedIn = val,
    })
  }

  logOut(){
    this.userService.logOut()
  }

}
