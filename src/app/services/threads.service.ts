import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { AllUserData } from "../../../shared/to/all-user-data";
import { Http, Headers } from "@angular/http";
import { SendNewMessageActionPayload } from '../store/actions';
import { commonHttpHeaders } from './commonHttpHeaders';

@Injectable()
export class ThreadsService {

  constructor(private http: Http) { }

  ignore = () => null;

  loadUserThreads(userId: number): Observable<AllUserData> {
    return this.http.get('/api/threads', commonHttpHeaders(userId))
      .map(res => res.json());
  }

  saveNewMessage(payload: SendNewMessageActionPayload): Observable<void> {
    return this.http.post(
      `"/api/threads/${payload.threadId}`,
      JSON.stringify({ text: payload.text }),
      commonHttpHeaders(payload.participantId)
    ).map(this.ignore);
  }



}
