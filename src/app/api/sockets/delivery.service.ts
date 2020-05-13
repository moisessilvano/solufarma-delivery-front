import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatSocketService {

  constructor(private socket: Socket
  ) { }

  getData(room) {
    return Observable.create(observer => {
      this.socket.on(room, res => {
        observer.next(res);
      });
    });
  }

}
