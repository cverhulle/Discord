import { Component, OnInit } from '@angular/core';
import { usernameImage } from '../../models/username-image.models';


@Component({
  selector: 'app-private-message-chat',
  imports: [],
  templateUrl: './private-message-chat.component.html',
  styleUrl: './private-message-chat.component.scss'
})


export class PrivateMessageChatComponent implements OnInit{
  // Variable pour récupérer les données de l'utilisateur à qui on envoie des messages.
  otherUser!: usernameImage;

  constructor() {}

  ngOnInit(): void {
    this.otherUser = new usernameImage();
    this.otherUser['id'] = history.state['id'],
    this.otherUser['username'] = history.state['username'],
    this.otherUser['image'] = history.state['image']
    console.log(this.otherUser)
  }



}
