import { Product } from './../models/product.model';
import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  httpOptions = {
    heades: new HttpHeaders({'Content-Type': 'Application/json', 'Access-Control-Allow-Origin': '*' })
  }
  apiURI = 'http://localhost:5000/api/products'
  constructor(private http:HttpClient) { }

  getProducts(filter: any): Observable<Product[]>{
      return this.http.get<Product[]>(`${this.apiURI}${filter['product_id'] ? '?id=' + filter['product_id'] : ''}`).pipe();
  }

}
