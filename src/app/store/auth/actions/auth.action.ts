import { User } from './../../../models/user.model';
import { createAction, props } from '@ngrx/store';

enum AuthActionTypes {
  LOGIN = '[AUTH_ACTION] Login',
  LOGIN_SUCCESS = '[AUTH_ACTION] Login success',
  LOGIN_FAIL = '[AUTH_ACTION] Login fail',
  REGISTER = '[AUTH_ACTION] Register',
  REGISTER_SUCCESS = '[AUTH_ACTION] Register success',
  REGISTER_FAIL = '[AUTH_ACTION] Register fail',
  SIGN_OUT = '[AUTH_ACTION] Signout',
  SIGN_OUT_SUCCESS = '[AUTH_ACTION] Signout success',
  SIGN_OUT_FAIL = '[AUTH_ACTION] Signout fail',
  CHECK_AUTH = '[AUTH_ACTION] Check auth',
  CHECK_AUTH_SUCCESS = '[AUTH_ACTION] Check auth success',
  CHECK_AUTH_FAIL = '[AUTH_ACTION] Check auth fail',
}

export const LoginAction = createAction(
  AuthActionTypes.LOGIN,
  props<{ username: string; password: string }>()
);

export const LoginSuccessAction = createAction(
  AuthActionTypes.LOGIN_SUCCESS,
  props<{ user: User; accessToken: string; refreshToken?: string }>()
);

export const LoginFailAction = createAction(
  AuthActionTypes.LOGIN_FAIL,
  props<{ message: string }>()
);

export const RegisterAction = createAction(AuthActionTypes.REGISTER);

export const RegisterSuccessAction = createAction(
  AuthActionTypes.REGISTER_SUCCESS,
  props<{ user: User }>()
);

export const RegisterFailAction = createAction(
  AuthActionTypes.REGISTER_FAIL,
  props<{ message: string }>()
);

export const SignOutAction = createAction(AuthActionTypes.SIGN_OUT);

export const SignOutSuccessAction = createAction(
  AuthActionTypes.SIGN_OUT_SUCCESS
);

export const SignOutFailAction = createAction(
  AuthActionTypes.SIGN_OUT_FAIL,
  props<{ message: string }>()
);

export const CheckAuthAction = createAction(AuthActionTypes.CHECK_AUTH);
export const CheckAuthSuccessAction = createAction(
  AuthActionTypes.CHECK_AUTH_SUCCESS,
  props<{ accessToken: string }>()
);

export const CheckAuthFailAction = createAction(
  AuthActionTypes.CHECK_AUTH_FAIL, props<{message: string}>()
);
export const AuthActions = {
  LoginAction,
  LoginSuccessAction,
  LoginFailAction,
  RegisterAction,
  RegisterSuccessAction,
  RegisterFailAction,
  SignOutAction,
  SignOutSuccessAction,
  SignOutFailAction,
  CheckAuthAction,
  CheckAuthSuccessAction,
  CheckAuthFailAction,
};
