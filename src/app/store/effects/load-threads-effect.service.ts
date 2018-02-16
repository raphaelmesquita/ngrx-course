import { Injectable } from '@angular/core';
import { ThreadsService } from "../../services/threads.service";
import { Actions, Effect } from "@ngrx/effects";
import { LOAD_USER_THREADS_ACTION, UserThreadsLoadedAction, SELECT_USER_ACTION, LoadUserThreadsAction } from '../actions';
import { Observable } from "rxjs";
import { Action } from "@ngrx/store";




@Injectable()
export class LoadThreadsEffectService {

  constructor(private actions$: Actions, private threadsService: ThreadsService) {

  }


  @Effect() userThreads$: Observable<Action> = this.actions$
    .ofType(LOAD_USER_THREADS_ACTION)
    .debug("action received")
    .switchMap((x: any) => this.threadsService.loadUserThreads(x.payload))
    .debug("data received via the HTTP request")
    .map(allUserData => new UserThreadsLoadedAction(allUserData));

  @Effect() newUserSelected$: Observable<Action> = this.actions$
    .ofType(SELECT_USER_ACTION)
    .debug("new user selected")
    .map((x: any) => new LoadUserThreadsAction(x.payload));

}
