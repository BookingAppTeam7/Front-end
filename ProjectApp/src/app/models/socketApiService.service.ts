import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Client } from 'stompjs';


import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import { environment } from 'src/env/env';
import { Message } from './message.model';
import { SocketService } from './socket.service';

@Injectable({
  providedIn: 'root',
})
export class SocketApiService {
  private serverUrl = environment.apiHost + 'socket';
  private stompClient: any;
  form!: FormGroup;
  userForm!: FormGroup;

  isLoaded: boolean = false;
  isCustomSocketOpened = false;
  messages: Message[] = [];

  constructor(private socketService: SocketService) {}

  initializeWebSocketConnection() {
    console.log("usaooo 27")
    let ws = new SockJS(this.serverUrl);
    console.log("usaooo 29")
    this.stompClient = Stomp.over(ws);
    console.log("usaooo 31")
    let that = this;
    console.log("usaooo 33")
    this.stompClient.connect({}, function () {
      that.isLoaded = true;
      console.log("usaooo 36")
      that.openGlobalSocket();
      console.log("usaooo 38")
    });
  }

  sendMessageUsingSocket(message: Message) {
    if (this.form.valid) {
      this.stompClient.send("/socket-subscriber/send/message", {}, JSON.stringify(message));
    }
  }

  sendMessageUsingRest(message: Message) {
    if (this.form.valid) {
      this.socketService.postRest(message).subscribe(res => {
        console.log(res);
      });
    }
  }

  openGlobalSocket() {
    if (this.isLoaded) {
      this.stompClient.subscribe("/socket-publisher", (message: { body: string }) => {
        this.handleResult(message);
      });
    }
  }

  openSocket() {
    if (this.isLoaded) {
      this.isCustomSocketOpened = true;
      this.stompClient.subscribe("/socket-publisher/" + this.userForm.value.fromId, (message: { body: string }) => {
        this.handleResult(message);
      });
    }
  }

  handleResult(message: { body: string }) {
    if (message.body) {
      let messageResult: Message = JSON.parse(message.body);
      this.messages.push(messageResult);
    }
  }
}