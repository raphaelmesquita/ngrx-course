


import { UiState, INITIAL_UI_STATE } from "../ui-state";
import { Action } from "@ngrx/store";
import { THREAD_SELECTED_ACTION, SELECT_USER_ACTION } from '../actions';


export function uiState(state: UiState = INITIAL_UI_STATE, action: any): UiState {

  switch (action.type) {

    case THREAD_SELECTED_ACTION:

      const newState = Object.assign({}, state);

      newState.currentThreadId = action.payload;

      return newState;

    case SELECT_USER_ACTION:

      return {
        ...state,
        userId: action.payload
      };

    default:
      return state;
  }

}
