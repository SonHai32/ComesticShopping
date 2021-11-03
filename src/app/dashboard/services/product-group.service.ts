import { map, take } from 'rxjs/operators';
import { ProductGroup } from './../../models/product-group.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class ProductGroupService {
  constructor(private http: HttpClient) {}

  private readonly URL = `${environment.apiURL}/product-groups`;

  getProductGroupList(): Observable<any> {
    return this.http.get(this.URL);
  }

  updateProductGroups(
    listUpdate: ProductGroup[]
  ): Observable<{ status: 'SUCCESS' | 'FAIL'; message: string }> {
    return this.http.put(this.URL, { listUpdate }).pipe(map((res: any) => res));
  }

  insertProductGroup(
    listProductGroup: ProductGroup[]
  ): Observable<{ status: 'SUCCESS' | 'FAIL'; message: string }> {
    return this.http
      .post(this.URL, { listProductGroup })
      .pipe(map((res: any) => res));
  }

  deleteProductGroup(
    listID: string[]
  ): Observable<{ status: 'SUCCESS' | 'FAIL'; message: string }> {
    return this.http
      .request('delete', this.URL, { body: { listID } })
      .pipe(map((res: any) => res));
  }
}
