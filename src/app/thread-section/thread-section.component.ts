import { Store } from "@ngrx/store";
import { Component, OnInit } from "@angular/core";
import * as _ from "lodash";

import { ThreadsService } from "../services/threads.service";
import { ApplicationState } from "../store/application-state";
import { LoadUserThreadsAction } from "../store/actions";
import { skip, map } from "rxjs/operators";
import { Observable } from "rxjs";

@Component({
  selector: "thread-section",
  templateUrl: "./thread-section.component.html",
  styleUrls: ["./thread-section.component.css"]
})
export class ThreadSectionComponent implements OnInit {

  userName$: Observable<string>;
  unreadMessagesCounter$: Observable<number>;

  constructor(private threadsService: ThreadsService, private store: Store<ApplicationState>) {
    this.userName$ =
      this.store.pipe(
        skip(1),
        map(this.mapStateToUserName));

    this.unreadMessagesCounter$ =
      this.store.pipe(
        skip(1),
        map(this.mapStateToUnreadMessagesCounter)
      )
  }

  mapStateToUserName(state: ApplicationState): string {
    return state.storeData.participants[state.uiState.userId].name;
  }

  mapStateToUnreadMessagesCounter(state: ApplicationState): number {
    let currentUserId = state.uiState.userId;
    return _.values(state.storeData.threads)
      .reduce((acc, thread) => acc + thread.participants[currentUserId], 0);
  }

  ngOnInit() {
    this.threadsService.loadUserThreads().subscribe(
      x => this.store.dispatch(new LoadUserThreadsAction(x))
    );
  }

}
