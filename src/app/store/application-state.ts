import { UiState, INITIAL_UI_STATE } from "./ui-state";
import { StoreData, INITIAL_STORE_DATA } from "./store-data";
import { Actions } from "./actions";

export interface ApplicationState {
  uiState: UiState;
  storeData: StoreData;
}
