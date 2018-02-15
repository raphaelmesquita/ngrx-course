import * as _ from "lodash";
import { USER_THREADS_LOADED_ACTION, Actions } from "../actions";
import { StoreData, INITIAL_STORE_DATA } from "../store-data";

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
