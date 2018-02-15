import { Injectable } from "@angular/core";
import { Actions, Effect } from "@ngrx/effects";

import { ThreadsService } from "../../services/threads.service";
import { LOAD_USER_THREADS_ACTION, UserThreadsLoadedAction } from "../actions";
import { map, switchMap } from "rxjs/operators";

@Injectable()
export class LoadThreadsEffectService {

  @Effect() userThreads$ = this.actions$
    .ofType(LOAD_USER_THREADS_ACTION)
    .pipe(
      switchMap(() => this.threadsService.loadUserThreads()),
      map(allUserData => new UserThreadsLoadedAction(allUserData))
    );

  constructor(private actions$: Actions, private threadsService: ThreadsService) { }
}
