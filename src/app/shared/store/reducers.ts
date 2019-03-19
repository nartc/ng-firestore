import { SharedActions, UI_START_LOADING, UI_STOP_LOADING } from './actions';

export interface UiState {
  isLoading: boolean;
}

export interface SharedState {
  ui: UiState;
}

const initialState: SharedState = {
  ui: {
    isLoading: false
  }
};

export function sharedReducers(state = initialState, action: SharedActions) {
  switch (action.type) {
    case UI_START_LOADING:
      return { ...state, ui: { ...state.ui, isLoading: true } };
    case UI_STOP_LOADING:
      return { ...state, ui: { ...state.ui, isLoading: false } };
    default:
      return state;
  }
}

export const getUiState = (state: SharedState) => state.ui;
export const getIsLoading = (uiState: UiState) => uiState.isLoading;
