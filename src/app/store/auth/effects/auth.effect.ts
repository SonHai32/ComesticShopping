import { AuthenticateService } from './../../../services/authenticate.service';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthActions } from '../actions/auth.action';
import { catchError, exhaustMap, map, tap, timeout } from 'rxjs/operators';
import { of, scheduled } from 'rxjs';
@Injectable()
export class AuthEffect {
  constructor(
    private action$: Actions,
    private authService: AuthenticateService
  ) {}

  checkAuthEffect$ = createEffect(() =>
    this.action$.pipe(
      ofType(AuthActions.CheckAuthAction),
      exhaustMap(() => this.authService.refreshToken()),
      map((accessToken: string) =>
        AuthActions.CheckAuthSuccessAction({
          accessToken,
        })
      ),
      catchError((error) => of(AuthActions.CheckAuthFailAction({message: (error as Error).message})))
    )
  );
}
