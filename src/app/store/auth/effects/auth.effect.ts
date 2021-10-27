import { UserService } from 'src/app/services/user.service';
import { AuthenticateService } from './../../../services/authenticate.service';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthActions } from '../actions/auth.action';
import { catchError, exhaustMap, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { User } from 'src/app/models/user.model';
@Injectable()
export class AuthEffect {
  constructor(
    private action$: Actions,
    private authService: AuthenticateService,
    private userService: UserService
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
      catchError((error) =>
        of(
          AuthActions.CheckAuthFailAction({ message: (error as Error).message })
        )
      )
    )
  );

  CheckAuthSuccessEffect$ = createEffect(() =>
    this.action$.pipe(
      ofType(AuthActions.CheckAuthSuccessAction),
      map(() => AuthActions.GetUserAuthAction())
    )
  );

  GetUserAuthEffect$ = createEffect(() =>
    this.action$.pipe(
      ofType(AuthActions.GetUserAuthAction),
      mergeMap((action) => this.userService.getUserAuth()),
      map((res: any) => {
        if (res.status === 'SUCCESS')
          return AuthActions.GetUserAuthSuccessAction({
            user: res.accessToken as User,
          });
        else
          return AuthActions.GetUserAuthFailAction({
            message: res.message as string,
          });
      })
    )
  );
}
