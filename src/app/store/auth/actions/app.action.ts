import { createAction, props } from '@ngrx/store';
import { MessageType } from 'src/app/types/message.type';
enum AppActionTypes{
  IS_LOADING = '[APP_ACTION] Is loading ...',
  IS_LOADING_SUCCESS = '[APP_ACTION] Is loading success',
  MESSAGE = '[APP_ACTION] Message',
  MESSAGE_DONE = '[APP_ACTION] Message done'
}

export const isLoadingAction  = createAction(AppActionTypes.IS_LOADING)
export const isLoadingSuccessAction  = createAction(AppActionTypes.IS_LOADING_SUCCESS)
export const messageAction = createAction(AppActionTypes.MESSAGE, props<{message: MessageType}>())
export const messageDoneAction = createAction(AppActionTypes.MESSAGE_DONE)


export const AppActions = {
  isLoadingAction,
  isLoadingSuccessAction,
  messageAction,
  messageDoneAction
}
