import { tap } from 'rxjs/operators';
import { AppSelectors } from './../store/auth/selector/app.selector';
import { NzMessageService } from 'ng-zorro-antd/message';
import { AuthActions } from './../store/auth/actions/auth.action';
import { Store } from '@ngrx/store';
import { MessageType } from '../types/message.type';
export const initializer = (store: Store) => {
  return () =>
    new Promise((reslove) => {
      reslove(store.dispatch(AuthActions.CheckAuthAction()));
    });
};

export const initialAppListening = (
  store: Store,
  messageService: NzMessageService
) => {
  return () =>
    new Promise((reslove) =>
      reslove(
        store
          .select(AppSelectors.messageSelector)
          .pipe(
            tap((message: MessageType) => {
              if (message.title)
                messageService.create(message.type, message.title);
            })
          )
          .subscribe()
      )
    );
};
