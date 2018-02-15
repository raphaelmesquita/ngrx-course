import { THREAD_SELECTED_ACTION, Actions } from "../actions";
import { UiState, INITIAL_UI_STATE } from "../ui-state";

export function uiState(state = INITIAL_UI_STATE, action: Actions): UiState {
  switch (action.type) {

    case THREAD_SELECTED_ACTION:
      return state;

    default:
      return state;

  }

}
