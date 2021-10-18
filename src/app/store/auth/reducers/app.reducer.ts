import { AppActions } from './../actions/app.action';
import { createReducer, on } from '@ngrx/store';
import { AppState } from '../state/app.state';

const initialAppState: AppState = {
  isLoading: false,
  message: { title: '', type: 'info' },
};

export const AppReducers = createReducer(
  initialAppState,
  on(AppActions.isLoadingAction, (state: AppState) => ({
    ...state,
    isLoading: true,
  })),
  on(AppActions.isLoadingSuccessAction, (state: AppState) => ({
    ...state,
    isLoading: false,
  })),
  on(AppActions.messageAction, (state: AppState, { message }) => ({
    ...state,
    message,
  })),
  on(AppActions.messageDoneAction, (state: AppState) => ({
    ...state,
    message: { ...state.message, title: '' },
  }))
);
