import { Store } from "@ngrx/store";
import { Component, OnInit } from "@angular/core";
import * as _ from "lodash";

import { ThreadsService } from "../services/threads.service";
import { ApplicationState } from "../store/application-state";
import { LoadUserThreadsAction } from "../store/actions";
import { skip, map } from "rxjs/operators";
import { Observable } from "rxjs";
import { ThreadSummaryVM } from "./thread-summary.vm";
import { mapStateToUserName } from "./mapStateToUserName";
import { mapStateToUnreadMessagesCounter } from "./mapStateToUnreadMessagesCounter";

@Component({
  selector: "thread-section",
  templateUrl: "./thread-section.component.html",
  styleUrls: ["./thread-section.component.css"]
})
export class ThreadSectionComponent implements OnInit {

  userName$: Observable<string>;
  unreadMessagesCounter$: Observable<number>;
  threadSummaries$: Observable<ThreadSummaryVM[]>;

  constructor(private threadsService: ThreadsService, private store: Store<ApplicationState>) {
    this.userName$ =
      this.store.pipe(
        skip(1),
        map(mapStateToUserName));

    this.unreadMessagesCounter$ =
      this.store.pipe(
        skip(1),
        map(mapStateToUnreadMessagesCounter));

    this.threadSummaries$ = store.select(
      state => {

        let threads = _.values(state.storeData.threads);

        return threads.map(thread => {

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

        });
      });
  }

  ngOnInit() {
    this.threadsService.loadUserThreads().subscribe(
      x => this.store.dispatch(new LoadUserThreadsAction(x))
    );
  }

}
