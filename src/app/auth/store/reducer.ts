import { AUTH_AUTHENTICATED, AUTH_UNAUTHENTICATED, AuthActions } from './actions';

export interface AuthState {
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  isAuthenticated: false
};

export function authReducer(state = initialState, action: AuthActions) {
  switch (action.type) {
    case AUTH_AUTHENTICATED:
      return { ...state, isAuthenticated: true };
    case AUTH_UNAUTHENTICATED:
      return { ...state, isAuthenticated: false };
    default:
      return state;
  }
}

export const getIsAuthenticated = (state: AuthState) => state.isAuthenticated;
