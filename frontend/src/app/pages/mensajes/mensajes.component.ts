import { Component, OnInit } from '@angular/core';
import { WebsocketService } from '../../services/websocket.service';

@Component({
  selector: 'app-mensajes',
  templateUrl: './mensajes.component.html',
  styleUrls: ['./mensajes.component.scss']
})
export class MensajesComponent implements OnInit {

  constructor(
    public wsService: WebsocketService
  ) { }

  ngOnInit() {
  }

  logout() {
    this.wsService.logoutWS();
  }

}
