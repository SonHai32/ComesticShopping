import { Cart } from './../../../models/cart.model';
import { CartService } from '../../../services/cart-service/cart.service';
import { User } from './../../../models/user.model';
import { UserService } from './../../../services/user-service/user.service';
import { Component, OnInit } from '@angular/core';
import { toCssPixel } from 'ng-zorro-antd/core/util';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isLoggedIn = false
  totalCart = 0
  listCart: Cart[] = []
  navItems: any;
  constructor(
    private userService: UserService,
    private CartService: CartService
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
    this.CartService.cartTotalObservable().subscribe((totalCart: number) =>{
      this.totalCart = totalCart
    })
    this.CartService.cartObservable().subscribe((listCart: Cart[]) =>{
      this.listCart = listCart
    })
  }

  logOut(){
    this.userService.logOut()
  }

}
