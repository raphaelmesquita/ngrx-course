import { Participant } from "../../../shared/model/participant";
import { Thread } from "../../../shared/model/thread";
import { Message } from "../../../shared/model/message";
import { LOAD_USER_THREADS_ACTION, Actions } from "./actions";

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
    case LOAD_USER_THREADS_ACTION:
      let userData = action.payload;
      return state;

    default:
      return state;
  }
}
