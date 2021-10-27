import { createReducer, on } from '@ngrx/store';
import { AuthState } from '../state/auth.state';
import { AuthActions } from '../actions/auth.action';
const initialState: AuthState = {
  currentUser: null,
  errorMessage: '',
  hasError: false,
  isAuthenticated: false,
  isLoading: false,
  accessToken: '',
};

export const authReducer = createReducer(
  initialState,

  on(AuthActions.LoginAction, (state) => ({ ...state, isLoading: true })),

  on(
    AuthActions.LoginSuccessAction,
    (state, { user, accessToken, refreshToken }) => ({
      ...state,
      isLoading: false,
      isAuthenticated: true,
      currentUser: user,
      accessToken,
      refreshToken,
    })
  ),

  on(AuthActions.LoginFailAction, (state, { message }) => ({
    ...state,
    errorMessage: message,
    hasError: true,
    isLoading: false,
  })),

  on(AuthActions.RegisterAction, (state) => ({ ...state, isLoading: true })),

  on(AuthActions.RegisterSuccessAction, (state, { user }) => ({
    ...state,
    currentUser: user,
    isLoading: false,
    isAuthenticated: true,
  })),

  on(AuthActions.RegisterFailAction, (state, { message }) => ({
    ...state,
    errorMessage: message,
    hasError: true,
    isLoading: false,
  })),

  on(AuthActions.SignOutAction, (state) => ({ ...state, isLoading: true })),

  on(AuthActions.SignOutSuccessAction, (state) => ({
    ...state,
    isLoading: false,
    currentUser: null,
    isAuthenticated: false,
    accessToken: '',
    refreshToken: '',
  })),

  on(AuthActions.SignOutFailAction, (state, { message }) => ({
    ...state,
    errorMessage: message,
    isLoading: false,
    hasError: true,
  })),

  on(AuthActions.CheckAuthAction, (state) => ({ ...state, isLoading: true })),

  on(AuthActions.CheckAuthSuccessAction, (state, { accessToken }) => ({
    ...state,
    accessToken,
    isAuthenticated: true,
    isLoading: false,
  })),

  on(AuthActions.CheckAuthFailAction, (state, { message }) => ({
    ...state,
    accessToken: '',
    isAuthenticated: false,
    isLoading: false,
    errorMessage: message,
  })),

  on(AuthActions.GetUserAuthAction, (state: AuthState) => ({
    ...state,
    isLoading: true,
  })),

  on(AuthActions.GetUserAuthSuccessAction, (state: AuthState, { user }) => ({
    ...state,
    currentUser: user,
    isAuthenticated: true,
    isLoading: false,
  })),

  on(AuthActions.GetUserAuthFailAction, (state: AuthState) => ({
    ...state,
    isLoading: false,
  }))
);
