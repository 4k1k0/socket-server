import { Component, OnInit, OnDestroy } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, OnDestroy {

  texto = '';
  mensajesSubscription: Subscription;
  mensajes: any[] = [];

  constructor(
    private chatService: ChatService
  ) { }

  ngOnInit() {
    this.mensajesSubscription = this.chatService.getMessages().subscribe( msg => {
      console.log(msg);
      this.mensajes.push(msg);
    }, err => {
      console.error(err);
    });
  }

  ngOnDestroy() {
    this.mensajesSubscription.unsubscribe();
  }

  enviar() {
    this.chatService.sendMessage(this.texto);
    this.texto = '';
  }

}
