

import { StoreData } from "../store-data";
import { Action } from "@ngrx/store";
import { USER_THREADS_LOADED_ACTION, UserThreadsLoadedAction, SEND_NEW_MESSAGE_ACTION, SendNewMessageAction } from '../actions';
import * as _ from 'lodash';
import { Message } from '../../../../shared/model/message';
import uuid from "uuid";

export function storeData(state: StoreData, action: Action): StoreData {
  switch (action.type) {

    case USER_THREADS_LOADED_ACTION:

      return handleLoadUserThreadsAction(state, <any>action);

    case SEND_NEW_MESSAGE_ACTION:

      let payload = (<SendNewMessageAction>action).payload;
      let currentThread = state.threads[payload.threadId];
      let newMessage: Message = {
        text: payload.text,
        threadId: payload.threadId,
        timestamp: new Date().getTime(),
        participantId: payload.participantId,
        id: uuid()
      }

      return {
        ...state,
        threads: {
          ...state.threads,
          [payload.threadId]: {
            ...currentThread,
            messageIds: [...currentThread.messageIds, newMessage.id]
          }
        },
        messages: {
          ...state.messages,
          [newMessage.id]: newMessage
        }
      }

    default:
      return state;
  }
}


function handleLoadUserThreadsAction(state: StoreData, action: UserThreadsLoadedAction): StoreData {
  return {
    participants: _.keyBy(action.payload.participants, 'id'),
    messages: _.keyBy(action.payload.messages, 'id'),
    threads: _.keyBy(action.payload.threads, 'id')
  };
}
