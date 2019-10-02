import { Component, OnInit } from '@angular/core';
import { WebsocketService } from '../../services/websocket.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  nombre = '';

  constructor(
    private wsService: WebsocketService
  ) { }

  ngOnInit() {
  }

  ingresar() {
    this.wsService.loginWS(this.nombre);
    this.nombre = '';
  }

}
