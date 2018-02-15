import * as _ from "lodash";

import { ApplicationState } from "../store/application-state";

export function unreadMessagesCounterSelector(state: ApplicationState): number {
  return _.values(state.storeData.threads)
    .reduce((acc, thread) => acc + (thread.participants[state.uiState.userId] || 0), 0);
}
