import { Cart } from './../../models/cart.model';
import { Observable, Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import * as Rx from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cartSubject = new Rx.BehaviorSubject([] as Cart[]);
  cartTotalSubject = new Rx.BehaviorSubject(0)

  cartTotalObservable(): Observable<number>{
    return this.cartTotalSubject.asObservable()
  }
  cartObservable(): Observable<Cart[]> {
    return this.cartSubject.asObservable();
  }

  constructor(){
    const listCartInStorage = localStorage.getItem('cart-list')
    if(listCartInStorage){
      const listCart = JSON.parse(listCartInStorage)
      this.cartSubject.next(listCart)
      this.cartTotalSubject.next(this.cartSubject.value.length)
    }
  }

  addToCart(cart: Cart) {
    let listCart = this.cartSubject.value;
    const checkCartExistIndex = () => {
      let index: number = -1;
      return new Promise((reslove, reject) => {
        try {
          for (let i = 0; i < listCart.length; i++) {
            if (listCart[i].product.id === cart.product.id) {
              index = i;
            }
          }
          reslove(index);
        } catch (error) {
          reject(error);
        }
      });
    };
    checkCartExistIndex().then((index: any) => {
      if (index !== -1) {
        listCart[index].amount = cart.amount + listCart[index].amount;
      } else {
        listCart.push(cart)
      }
      this.cartSubject.next(listCart)
      this.cartTotalSubject.next(this.cartSubject.value.length)
      localStorage.setItem('cart-list', JSON.stringify(this.cartSubject.value))
    });
  }
}
