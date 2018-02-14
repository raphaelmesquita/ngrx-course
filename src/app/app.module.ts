import { StoreModule } from "@ngrx/store";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { storeFreeze } from "ngrx-store-freeze";

import { AppComponent } from "./app.component";
import { UserSelectionComponent } from "./user-selection/user-selection.component";
import { ThreadSectionComponent } from "./thread-section/thread-section.component";
import { MessageSectionComponent } from "./message-section/message-section.component";
import { ThreadListComponent } from "./thread-list/thread-list.component";
import { MessageListComponent } from "./message-list/message-list.component";
import { ThreadsService } from "./services/threads.service";
import { environment } from "../environments/environment";

import { storeData } from "./store/store-data";
import { uiState } from "./store/ui-state";

export const reducers = {
  uiState,
  storeData
};

export const metaReducers = !environment.production ? [storeFreeze] : [];

@NgModule({
  declarations: [
    AppComponent,
    UserSelectionComponent,
    ThreadSectionComponent,
    MessageSectionComponent,
    ThreadListComponent,
    MessageListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    StoreModule.forRoot(reducers, { metaReducers })
  ],
  providers: [ThreadsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
