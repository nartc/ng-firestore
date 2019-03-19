import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromAuthStore from '../auth/store';
import * as fromSharedStore from '../shared/store';

export interface AppState {
  shared: fromSharedStore.SharedState;
  auth: fromAuthStore.AuthState;
}

export const rootReducers: ActionReducerMap<AppState> = {
  shared: fromSharedStore.sharedReducers,
  auth: fromAuthStore.authReducer
};

export const sharedStateSelector = createFeatureSelector<AppState, fromSharedStore.SharedState>('shared');
export const authStateSelector = createFeatureSelector<AppState, fromAuthStore.AuthState>('auth');

export const uiStateSelector = createSelector(sharedStateSelector, fromSharedStore.getUiState);
export const isLoadingSelector = createSelector(uiStateSelector, fromSharedStore.getIsLoading);

export const isAuthenticatedSelector = createSelector(authStateSelector, fromAuthStore.getIsAuthenticated);
