import { environment } from './../../../environments/environment';
import { Product } from 'src/app/models/product.model';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { take } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}

  URL: string = `${environment.apiURL}/products/`;

  insertProduct(product: Product) {
    return this.http.post(this.URL, { product });
  }

  updateProduct(product: Product) {
    return this.http.patch(this.URL, { product });
  }
  getProductByID(ID: string) {
    const url: string = `${this.URL}product-detail?id=${ID}`;
    return this.http.get(url);
  }

  // gelAll(filter: any): Observable<any[]> {
  //   return this.http.get<Product[]>(
  //     `${this.URL}?page=${filter['page'] - 1}&perPage=${filter['perPage']}${
  //       filter['product_id'] ? '&id=' + filter['product_id'] : ''
  //     }${filter['cat_id'] ? '&cat_id=' + filter['cat_id'] : ''}${
  //       filter['price']
  //         ? '&price=' + filter['price'][0] + ',' + filter['price'][1]
  //         : ''
  //     }${filter['name'] ? '&name=' + filter['name'] : ''}`
  //   );
  // }
  getProducts(filter?: any): Observable<any> {
    return this.http.request('get', this.URL, { params: filter });
  }

  deleteProduct(listOfID: string[]) {
    return this.http.request('delete', this.URL, { body: { listOfID } });
  }
}
