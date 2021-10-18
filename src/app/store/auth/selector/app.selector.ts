import { AppState } from './../state/app.state';
import { createFeatureSelector, createSelector } from '@ngrx/store';
const appFeatureSelector = createFeatureSelector<AppState>('app');

export const messageSelector = createSelector(
  appFeatureSelector,
  (state: AppState) => state.message
);

export const isLoadingSelector = createSelector(
  appFeatureSelector,
  (state: AppState) => state.isLoading
);

export const AppSelectors = {
  messageSelector,
  isLoadingSelector,
};
