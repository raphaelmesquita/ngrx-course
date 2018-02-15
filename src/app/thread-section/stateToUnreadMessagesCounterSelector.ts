import * as _ from "lodash";

import { ApplicationState } from "../store/application-state";

export function stateToUnreadMessagesCounterSelector(state: ApplicationState): number {
  let currentUserId = state.uiState.userId;
  return _.values(state.storeData.threads)
    .reduce((acc, thread) => acc + thread.participants[currentUserId], 0);
}
