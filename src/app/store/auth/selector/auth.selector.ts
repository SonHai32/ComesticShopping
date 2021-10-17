import { AuthState } from './../state/auth.state';
import { createFeatureSelector, createSelector } from '@ngrx/store';

const featureSelector = createFeatureSelector<AuthState>('auth');

export const tokenSelector = createSelector(
  featureSelector,
  (state: AuthState) => state.accessToken
);
export const userSelector = createSelector(
  featureSelector,
  (state: AuthState) => state.currentUser
);
export const isLoadingSelector = createSelector(
  featureSelector,
  (state: AuthState) => state.isLoading
);

export const AuthSelector = {
  tokenSelector,
};
