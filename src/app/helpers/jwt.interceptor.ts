import { Store } from '@ngrx/store';
import { AuthSelector } from './../store/auth/selector/auth.selector';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { take, mergeMap } from 'rxjs/operators';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private store: Store) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    req = req.clone({ setHeaders: { 'Content-Type': 'application/json' } });
    if (req.url.endsWith('refreshToken')) {
      req = req.clone({
        withCredentials: true,
      });
    } else if (
      req.method == 'DELETE' ||
      req.method == 'PUT' ||
      req.method == 'POST' ||
      req.method == 'PATCH' ||
      (req.url.endsWith('users') && req.method == 'GET')
    ) {
      return this.store.select(AuthSelector.TokenSelector).pipe(
        take(1),
        mergeMap((token: string) => {
          req = req.clone({
            setHeaders: {
              Authorization: `Bearer ${token}`,
            },
          });
          return next.handle(req);
        })
      );
    }
    return next.handle(req);
  }
}
