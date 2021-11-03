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
import { take, mergeMap, retryWhen, delay, scan } from 'rxjs/operators';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private store: Store) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Custom requets for retriving fecth data with 3 attemps when error
    const customNextHandle = (request: HttpRequest<any>) => {
      return next.handle(request).pipe(
        retryWhen((err) =>
          err.pipe(
            delay(1000),
            scan((attempCount: number) => {
              if (attempCount > 3) {
                throw new Error('Error while fetching data');
              } else {
                const increaseAttemp = attempCount + 1;
                return increaseAttemp;
              }
            }, 0)
          )
        )
      );
    };

    req = req.clone({ setHeaders: { 'Content-Type': 'application/json' } });

    if (req.url.endsWith('refreshToken')) {
      req = req.clone({
        withCredentials: true,
      });
    } else if (
      req.method === 'DELETE' ||
      req.method === 'PUT' ||
      req.method === 'POST' ||
      req.method === 'PATCH' ||
      (req.url.endsWith('users') && req.method === 'GET') ||
      (req.url.endsWith('product-groups') && req.method === 'GET')
    ) {
      return this.store.select(AuthSelector.TokenSelector).pipe(
        mergeMap((token: string) => {
          req = req.clone({
            setHeaders: {
              Authorization: `Bearer ${token}`,
            },
          });
          return customNextHandle(req);
        })
      );
    }
    return customNextHandle(req);
  }
}
