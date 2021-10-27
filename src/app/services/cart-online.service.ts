import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Cart } from '../models/cart.model';

@Injectable({
  providedIn: 'root',
})
export class CartOnlineService {
  private readonly URL: string = `${environment.apiURL}/carts`;
  constructor(private http: HttpClient) {}

  getCart() {
    return this.http.get(this.URL);
  }

  updateCartQuantity(cartID: string, quantity: number) {
    return this.http.put(this.URL, { cartID, quantity });
  }

  insertCart(cart: Cart) {
    return this.http.post(this.URL, { cart });
  }

  deleteCart(cartID: string) {
    return this.http.request('delete', this.URL, { body: { cartID } });
  }
}
