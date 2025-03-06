import { Component, OnInit } from '@angular/core';
import { usernameImage } from '../../models/username-image.models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-private-message-chat',
  imports: [],
  templateUrl: './private-message-chat.component.html',
  styleUrl: './private-message-chat.component.scss'
})


export class PrivateMessageChatComponent implements OnInit{
  // Variable pour récupérer les données de l'utilisateur à qui on envoie des messages.
  otherUser!: usernameImage;

  constructor(private router: Router) {}

  ngOnInit(): void {
    
    this.otherUser = history.state
    console.log(this.otherUser)
  }



}
