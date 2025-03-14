import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { catchError, of, tap } from 'rxjs';



import { FormsModule } from '@angular/forms';
import { NgFor, NgIf, NgStyle } from '@angular/common';
import { SharedModule } from '../../../shared/shared.module';

import { usernameImage } from '../../models/username-image.models';
import { Post } from '../../../shared/post/models/post.model';

import { AvatarService } from '../../../shared/avatar/service/avatar.service';
import { PostService } from '../../../shared/post/services/post.service';

import { TimeAgoPipe } from '../../../shared/post/pipe/time-ago.pipe';
import { UserService } from '../../../shared/post/services/user.service';
import { DisplayService } from '../../../shared/display/service/display.service';




@Component({
  selector: 'app-private-message-chat',
  imports: [
    SharedModule,
    FormsModule,
    NgFor,
    NgStyle,
    NgIf,
    TimeAgoPipe
  ],
  templateUrl: './private-message-chat.component.html',
  styleUrl: './private-message-chat.component.scss'
})


export class PrivateMessageChatComponent implements OnInit{
  // Directive pour scroller el chat en bas après l'envoi d'un nouveau message.
  @ViewChild('chatContainer') chatContainer!: ElementRef

  // Variable pour suivre l'état de chargement
  loading!: boolean

  // Variable pour récupérer les données de l'utilisateur actuel.
  currentUser!: usernameImage;

  // Variable pour récupérer les données de l'utilisateur à qui on envoie des messages.
  otherUser: usernameImage = {id: '', username: '', image: ''}

  // Variable pour récupérer le texte dans le message.
  messageContent: string = ''

  // Variable qui stocke la discussion entre les utilisateurs
  chat: Post[] = []

  // Variable pour vérifier si l'historique de discussion entre deux utilisateurs est vide ou non
  chatIsEmpty!: boolean

  constructor(private avatarService : AvatarService,
              private postService : PostService,
              private userService : UserService,
              private displayService : DisplayService) {}


  ngOnInit(): void {
    this.initUsers()
    if (this.otherUser.id !== '') {
      this.initChat(this.otherUser.id)
    }
  }

  // Cette méthode initialise les données des utilisateurs de la discussion.
  private initUsers(): void {
    this.initCurrentUser(),
    this.initOtherUser()
  }

  // Cette méthode initialise les données de l'utilisateur actuellement connecté
  private initCurrentUser(): void {
    this.userService.getCurrentUser().pipe(
      tap( user => this.currentUser = user),
      catchError( () => {
        this.displayService.displayMessage('Erreur lors de la récupération des données de l\'utilisateur.')
        return of(false)
      })
    ).subscribe()
  }



  // Cette méthode initialise les données de l'utilisateur avec lequel on va communiquer.
  private initOtherUser(): void {
    try {
      this.otherUser = this.userService.getOtherUser(history.state)
    } catch (error) {
      this.displayService.displayMessage('Erreur lors de la récupération des données de l\'utilisateur.')
    }
          
  }



  // Cette méthode initialise l'historique de la discussion entre les utilisateurs : on ne récupère que les 10 derniers messages.
  private initChat(otherUserId: string): void {
    this.loading = true
    this.postService.initChat(otherUserId).subscribe(
      (result) => {
        this.chat = result.updatedChat
        this.chatIsEmpty = result.updatedChatIsEmpty
        this.loading = false
        console.log(this.chat)
        this.scrollToBottom()
      }
    )
  }

  // Méthode au clic sur le bouton envoi.
  onSendMessage(): void{
    if (this.postService.messageValid(this.messageContent)) {
      this.loading = true

      const postToSend = this.postService.createPostToSend(
        this.currentUser.id, 
        this.otherUser.id, 
        this.currentUser.username, 
        this.currentUser.image, 
        this.messageContent
      )

      this.postService.sendPost(postToSend, this.chat)
        .subscribe( (result) => {
          this.chat= result.updatedChat
          console.log(this.chat)
          this.chatIsEmpty = result.updatedChatIsEmpty
          this.messageContent = result.updatedMessageContent
          this.loading = false
          this.scrollToBottom();
      })
        
    } else {
      this.displayService.displayMessage('Le message ne peut pas être vide et doit contenir moins de 500 caractères.')
    }
    
  }

  // Méthode pour charger plus de messages à l'appui du bouton.
  onLoadMoreMessages(): void {
    this.loading = true;
    
    this.postService.loadMoreMessages(this.otherUser.id, this.chat).subscribe(
      ( (chat) => {
        this.chat = chat
        this.loading = false
      }),
    )
  } 

  // Méthode pour éditer un message.
  onEditMessage(post : Post) {
    console.log(post)
  }

  // Méthode pour supprimer un message.
  onDeleteMessage(post : Post) {
    if (!post._id) {
      this.displayService.displayMessage('ID du message non disponible.');
      return; 
    }

    this.loading = true

    this.postService.deletePost(post._id, this.chat).subscribe(
      (updatedChat) => {
        this.chat = updatedChat
        this.loading = false
        this.scrollToBottom()
      }
    )


  }
  

  // Scroll de l'écran après l'envoi d'un nouveau message.
  private scrollToBottom(): void {
    setTimeout(() => {
      this.chatContainer.nativeElement.scrollTop = this.chatContainer.nativeElement.scrollHeight;
    }, 200);
  }

  // Si l'image ne peut pas être chargée, on modifie l'Url du profil par l'Url par défaut.
  getProfileImage(post: Post): string {
    return this.avatarService.getProfileImage(post.image, post.username)
  }

  // Met l'imageError du service à true pour l'utilisateur.
  setImageError(post: Post): void {
    this.avatarService.updateImageError(post.username, true)
  }

  // Récupérer la couleur de la mat-card
  getPostCardColor(postId: string) : string {
    return this.postService.getPostCardColor(postId, this.currentUser.id)
  }








  

}
