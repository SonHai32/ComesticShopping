import { AuthState } from './../state/auth.state';
import { createFeatureSelector, createSelector } from '@ngrx/store';

const featureSelector = createFeatureSelector<AuthState>('auth');

export const TokenSelector = createSelector(
  featureSelector,
  (state: AuthState) => state.accessToken
);

export const UserSelector = createSelector(
  featureSelector,
  (state: AuthState) => state.currentUser
);

export const IsLoadingSelector = createSelector(
  featureSelector,
  (state: AuthState) => state.isLoading
);

export const AuthSelector = {
  TokenSelector,
  UserSelector
};
