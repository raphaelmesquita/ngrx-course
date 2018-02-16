import { Injectable } from '@angular/core';
import { ThreadsService } from "../../services/threads.service";
import { Actions, Effect } from "@ngrx/effects";
import { Observable } from 'rxjs';
import { Action } from '@ngrx/store';
import { SEND_NEW_MESSAGE_ACTION } from '../actions';

@Injectable()
export class WriteNewMessageEffectService {

  constructor(private actions$: Actions, private threadsService: ThreadsService) { }

  @Effect({ dispatch: false })
  newMessages$: Observable<void> = this.actions$
    .ofType(SEND_NEW_MESSAGE_ACTION)
    .switchMap((action: any) =>
      this.threadsService.saveNewMessage(action.payload));

}
