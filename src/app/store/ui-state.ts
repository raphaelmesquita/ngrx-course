import { Action } from "@ngrx/store/store";

export interface UiState {
  userId: number;
  currentThreadId: number;
}

export const INITIAL_UI_STATE: UiState = {
  userId: undefined,
  currentThreadId: undefined
};

export function uiState(state = INITIAL_UI_STATE, action: Action): UiState {
  return state;
}
