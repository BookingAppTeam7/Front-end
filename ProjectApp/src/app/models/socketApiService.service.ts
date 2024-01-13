import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Client } from 'stompjs';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import { environment } from 'src/env/env';
import { Message } from './message.model';
import { SocketService } from './socket.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class SocketApiService {
  private serverUrl = environment.apiHost + 'socket';
  private stompClient: any;
  
  private stompSubject = new BehaviorSubject<any>(null);
  private username:string


  isLoaded: boolean = false;
  isCustomSocketOpened = false;
  messages: Message[] = [];

  constructor(private socketService: SocketService) {
       
  // const accessToken: any = localStorage.getItem('user');
  // const helper = new JwtHelperService();
  // const decodedToken = helper.decodeToken(accessToken);
  //   this.username=decodedToken.sub;
    this.initializeWebSocketConnection();

  }

  // initializeWebSocketConnection() {
  //   let ws = new SockJS(this.serverUrl);
  //   this.stompClient = Stomp.over(ws);
  //   let that = this;
  //   this.stompClient.connect({}, function () {
  //     that.isLoaded = true;
  //     that.openGlobalSocket();
  //     that.setStompClient(that.stompClient);
  //     console.log("WebSocket connection state:", that.stompClient.connected);
  //   });
  // }
  initializeWebSocketConnection() {
    // serverUrl je vrednost koju smo definisali u registerStompEndpoints() metodi na serveru
    let ws = new SockJS(this.serverUrl);
    this.stompClient = Stomp.over(ws);
    let that = this;

    this.stompClient.connect({}, function () {
      that.isLoaded = true;
      that.openGlobalSocket()
    });

  }

  sendUserIdOnLogin(userId: string) {
    this.stompClient.send("/send/userId", {}, JSON.stringify({ userId }));
  }
  

  sendMessageUsingSocket(message: Message) {
      this.stompClient.send("/socket-subscriber/send/message", {}, JSON.stringify(message));
      console.log('Notification sent:', message);
  }

  sendMessageUsingRest(message: Message) {
      this.socketService.postRest(message).subscribe(res => {
      });
    
  }

  openGlobalSocket() {
    if (this.isLoaded) {
      this.stompClient.subscribe("/socket-publisher", (message: { body: string }) => {
        this.handleResult(message);
      });
    }
  }

  // openSocket(username:String) {
  //     this.isCustomSocketOpened = true;
  //     console.log("Pretplata na kanal:","/socket-publisher/" + "GOST@gmail.com");
  //     if(this.stompClient){
  //       console.log("RADI ")
  //     }
  //     console.log("Pre subscribe");
  //     this.stompClient.subscribe("/socket-publisher/" +"GOST@gmail.com", (message: { body: string }) => {
  //       console.log("U subscribe callback-u");
  //       this.handleResult(message);
  //     });
  //     console.log("Posle subscribe");
    
  // }
  openSocket(username:String) {
    console.log("USERNAMEEEE jeee "+username)
    if (this.isLoaded) {
      this.isCustomSocketOpened = true;
      console.log("USERNAMEEEE "+username)
      this.stompClient.subscribe("/socket-publisher/" + username, (message: { body: string; }) => {
        console.log("922222")
        this.handleResult(message);
      });
    }
  }

  handleResult(message: { body: string; }) {
    console.log("HANDLE RESULTT")
    if (message.body) {
      let messageResult: Message = JSON.parse(message.body);
      this.messages.push(messageResult);
    }
  }


//   getStompClient(): any {
//     return this.stompClient;
// }

getStompClient(): BehaviorSubject<any> {
  return this.stompClient;
}

  private setStompClient(client: any) {
    this.stompClient = client;
    this.stompSubject.next(client);
  }
  setUsername(username:string){

  }
}