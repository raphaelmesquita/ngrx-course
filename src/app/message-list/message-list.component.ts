import { Component, OnInit, Input, ElementRef, ViewChild, OnChanges, SimpleChanges } from '@angular/core';
import * as _ from "lodash";

import { MessageVM } from "../message-section/message.vm";

@Component({
  selector: 'message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent implements OnChanges {

  @Input()
  messages: MessageVM[];

  @ViewChild("list")
  list: ElementRef;

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes["messages"]) {
      let previousMessages = changes["messages"].previousValue || [];
      let newMessages = changes["messages"].currentValue || [];
      if (newMessages.length > previousMessages.length) {
        setTimeout(() => {
          this.scrollLastMessageIntoView();
        });
      }
    }
  }

  scrollLastMessageIntoView() {
    let items = this.list.nativeElement.querySelectorAll("li");
    let lastItem: any = _.last(items);
    if (lastItem) {
      lastItem.scrollIntoView();
    }
  }

}
