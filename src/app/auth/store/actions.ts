import { Action } from '@ngrx/store';

export const AUTH_AUTHENTICATED = '[Auth] Authenticated';
export const AUTH_UNAUTHENTICATED = '[Auth] Unauthenticated';

export class Authenticated implements Action {
  constructor(public readonly type: string = AUTH_AUTHENTICATED) {
  }
}

export class Unauthenticated implements Action {
  constructor(public readonly type: string = AUTH_UNAUTHENTICATED) {
  }
}

export type AuthActions = Authenticated | Unauthenticated;
