import { UiState } from "./ui-state";
import { StoreData } from "./store-data";
import { Actions } from "./actions";

export interface ApplicationState {
  uiState: UiState;
  storeData: StoreData;
}
