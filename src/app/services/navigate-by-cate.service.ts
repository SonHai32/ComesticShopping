import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class NavigateByCateService {

  btnHandleCategory: Subject<any> = new Subject()
  btnHandleCategoryObservable = this.btnHandleCategory.asObservable()
  constructor() { }
}
