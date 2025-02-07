import { createReducer, on } from '@ngrx/store';
import * as AuthActions from './auth.actions';

export interface AuthState {
  user: any | null;
  loading: boolean;
  error: any | null;
}

export const initialState: AuthState = {
  user: null,
  loading: false,
  error: null
};

export const authReducer = createReducer(
  initialState,

  on(AuthActions.login, state => ({
    ...state,
    loading: true,
    error: null
  })),

  on(AuthActions.loginSuccess, (state, { user }) => {
    console.log('Auth reducer handling loginSuccess with user:', user);
    return {
      ...state,
      user,
      loading: false,
      error: null
    };
  }),

  on(AuthActions.loginFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  on(AuthActions.logoutSuccess, state => ({
    ...state,
    user: null,
    loading: false,
    error: null
  }))
);
