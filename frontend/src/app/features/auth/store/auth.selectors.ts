import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from './auth.reducer';

export const selectAuthState = createFeatureSelector<AuthState>('auth');

export const selectUser = createSelector(
  selectAuthState,
  (state: AuthState) => state?.user ?? null
);

export const selectIsAuthenticated = createSelector(
  selectAuthState,
  (state: AuthState) => !!state?.user
);

export const selectAuthLoading = createSelector(
  selectAuthState,
  (state) => state.loading
);

export const selectAuthError = createSelector(
  selectAuthState,
  (state) => state.error
);

// Add this temporary debug selector
export const selectAuthStateDebug = createSelector(
  selectAuthState,
  (state: AuthState) => state
);
