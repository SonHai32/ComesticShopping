import { timeout, map, tap } from 'rxjs/operators';
import { AppActions } from './../actions/app.action';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
@Injectable()
export class AppEffects {
  constructor(private action$: Actions) {}

  messageEffect$ = createEffect(() =>
    this.action$.pipe(
      ofType(AppActions.messageAction),
      map(() => {
        return AppActions.messageDoneAction()
      })
    )
  );
}
