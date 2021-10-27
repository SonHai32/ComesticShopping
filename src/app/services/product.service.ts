import { Product } from './../models/product.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private readonly URL: string = `${environment.apiURL}/products`;
  // httpOptions = {
  //   headers: new HttpHeaders({
  //     'Content-Type': 'Application/json',
  //     'Access-Control-Allow-Origin': '*',
  //   }),
  // };

  // apiURI = 'http://localhost:5000/api/products'
  // apiURI = 'https://hame-comestic-api.herokuapp.com/api/products';

  constructor(private http: HttpClient) {}

  getProducts(filter?: any): Observable<any> {
    return this.http.request('get', this.URL, { params: filter });
  }
}
