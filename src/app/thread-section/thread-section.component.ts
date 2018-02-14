import { Store } from "@ngrx/store";
import { Component, OnInit } from "@angular/core";
import { ThreadsService } from "../services/threads.service";
import { ApplicationState } from "../store/application-state";
import { LoadUserThreadsAction } from "../store/actions";

@Component({
  selector: "thread-section",
  templateUrl: "./thread-section.component.html",
  styleUrls: ["./thread-section.component.css"]
})
export class ThreadSectionComponent implements OnInit {

  constructor(private threadsService: ThreadsService, private store: Store<ApplicationState>) {
    this.store.subscribe(
      state => console.log("thread section received state", state)
    );
  }

  ngOnInit() {
    this.threadsService.loadUserThreads().subscribe(
      x => this.store.dispatch(new LoadUserThreadsAction(x))
    );
  }

}
