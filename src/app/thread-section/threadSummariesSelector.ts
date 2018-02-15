import * as _ from "lodash";
import { ApplicationState } from "../store/application-state";
import { ThreadSummaryVM } from "./thread-summary.vm";
import { Thread } from "../../../shared/model/thread";

export function threadSummariesSelector(state: ApplicationState): ThreadSummaryVM[] {

  let mapThreadToThreadSummary = (thread: Thread) => {
    let names = _.keys(thread.participants).map(
      participantId => state.storeData.participants[participantId].name);

    let lastMessageId = _.last(thread.messageIds);
    let lastMessage = state.storeData.messages[lastMessageId];

    return {
      id: thread.id,
      participantNames: _.join(names, ","),
      lastMessageText: lastMessage.text,
      timestamp: lastMessage.timestamp
    };
  };

  return _.values(state.storeData.threads).map(mapThreadToThreadSummary);
}
