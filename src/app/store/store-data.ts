import * as _ from "lodash";

import { Participant } from "../../../shared/model/participant";
import { Thread } from "../../../shared/model/thread";
import { Message } from "../../../shared/model/message";
import { USER_THREADS_LOADED_ACTION, Actions } from "./actions";

export interface StoreData {
  participants: { [key: number]: Participant };
  threads: { [key: number]: Thread };
  messages: { [key: number]: Message };
}

export const INITIAL_STORE_DATA: StoreData = {
  threads: {},
  messages: {},
  participants: {}
};

export function storeData(state = INITIAL_STORE_DATA, action: Actions): StoreData {
  switch (action.type) {
    case USER_THREADS_LOADED_ACTION:
      let userData = action.payload;
      return {
        ...state,
        participants: _.keyBy(userData.participants, x => x.id),
        messages: _.keyBy(userData.messages, x => x.id),
        threads: _.keyBy(userData.threads, x => x.id)
      };

    default:
      return state;
  }
}
