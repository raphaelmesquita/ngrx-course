import { Store } from "@ngrx/store";
import { Component, OnInit } from "@angular/core";
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

  constructor(private threadsService: ThreadsService, private store: Store<ApplicationState>) {
    this.userName$ = this.store.pipe(
      skip(1),
      map(this.mapStateToUserName));
  }

  mapStateToUserName(state: ApplicationState): string {
    return state.storeData.participants[state.uiState.userId].name;
  }

  ngOnInit() {
    this.threadsService.loadUserThreads().subscribe(
      x => this.store.dispatch(new LoadUserThreadsAction(x))
    );
  }

}
