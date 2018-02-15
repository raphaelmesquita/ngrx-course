import { ApplicationState } from "../store/application-state";

export function userNameSelector(state: ApplicationState): string {
  let currentParticipant = state.storeData.participants[state.uiState.userId];
  return currentParticipant && currentParticipant.name;
}
