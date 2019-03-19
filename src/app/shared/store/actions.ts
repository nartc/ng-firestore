import { Action } from '@ngrx/store';

export const UI_START_LOADING = '[UI] Start Loading';
export const UI_STOP_LOADING = '[UI] Stop Loading';

export class StartLoading implements Action {
  constructor(public readonly type: string = UI_START_LOADING) {
  }
}

export class StopLoading implements Action {
  constructor(public readonly type: string = UI_STOP_LOADING) {
  }
}

export type SharedActions = StartLoading | StopLoading;
