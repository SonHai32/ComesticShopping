import { Observable } from 'rxjs';
import { Category } from './../../models/category.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  URL: string = `${environment.apiURL}/categories`;
  constructor(private http: HttpClient) {}

  getAllCategory(filter?: { page: number; perPage: number }) {
    return this.http.get(
      `${this.URL}${
        filter ? '?page=' + filter.page + '&perPage=' + filter.perPage : ''
      }`
    );
  }

  getCategoryDetail(ID: string): Observable<any> {
    return this.http.get(`${this.URL}/detail?id=${ID}`);
  }

  insertCategory(category: Category) {
    return this.http.post(this.URL, { category });
  }
  updateCategory(categoryID: string, category: Category) {
    return this.http.put(this.URL, { id: categoryID, category });
  }
}
