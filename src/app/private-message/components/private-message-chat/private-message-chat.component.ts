import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { catchError, Observable, of, tap } from 'rxjs';



import { FormsModule } from '@angular/forms';
import { NgFor, NgIf, NgStyle } from '@angular/common';
import { SharedModule } from '../../../shared/shared.module';

import { usernameImage } from '../../models/username-image.models';
import { Post } from '../../../shared/post/models/post.model';

import { ProfileService } from '../../../profile/service/profile.service';
import { AvatarService } from '../../../shared/avatar/service/avatar.service';
import { PostService } from '../../../shared/post/services/post.service';

import { TimeAgoPipe } from '../../../shared/post/pipe/time-ago.pipe';
import { UserService } from '../../../shared/post/services/user.service';
import { ErrorService } from '../../../shared/error/service/error.service';



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
  otherUser!: usernameImage;

  // Variable pour récupérer le texte dans le message.
  messageContent: string = ''

  // Variable qui stocke la discussion entre les utilisateurs
  chat: Post[] = []

  // Variable pour vérifier si l'historique de discussion entre deux utilisateurs est vide ou non
  chatIsEmpty!: boolean

  constructor(private profileService : ProfileService,
              private avatarService : AvatarService,
              private postService : PostService,
              private userService : UserService,
              private errorService : ErrorService) {}


  ngOnInit(): void {
    this.initUsers()
    this.initChat(this.otherUser.id)
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
        this.errorService.displayError('Erreur lors de la récupération des données de l\'utilisateur.')
        return of(false)
      })
    ).subscribe()
  }



  // Cette méthode initialise les données de l'utilisateur avec lequel on va communiquer.
  private initOtherUser(): void {
    this.otherUser = this.userService.getOtherUser(history.state)
          
  }



  // Cette méthode initialise l'historique de la discussion entre les utilisateurs : on ne récupère que les 10 derniers messages.
  private initChat(otherUserId: string): void {
    this.loading = true
    this.postService.getPreviousPosts(otherUserId,0).pipe(
      tap( (posts) => {
        this.chat = posts;
        this.chatIsEmpty = this.postService.IsChatEmpty(this.chat)
        this.loading = false
      }),
      catchError( () => {
        this.errorService.displayError('Erreur lors du chargement de la discussion.')
        this.loading = false
        return of(false)
      })
    ).subscribe()
  }




  // Méthode à appeler lorsque l'envoi du post est réussi.
  private sendPostSuccess(message : Post, chat: Post[]): void {
    const result = this.postService.sendPostSuccess(message, chat)

    // On met à jour le chat, la variable pour vérifier si le chat est vide et le contenu du message.
    this.chat = result.updatedChat;
    this.chatIsEmpty = result.updatedChatIsEmpty;
    this.messageContent = result.updatedMessageContent;

    // On scrolle en bas de la page pour voir le message envoyé.
    this.scrollToBottom();

  }




  // Méthode à appeler lorsque l'envoi du post a échoué.
  private sendPostError(): void {
    this.postService.sendPostError()
  }


 
  // Méthode pour envoyer le post au service.
  private sendPost(message : Post, chat: Post[]): Observable<boolean> {
    return this.postService.sendPostBackend(message).pipe(
      tap( sucess => {
        if (sucess) {
          this.sendPostSuccess(message, chat)
        } else {
          this.sendPostError()
        }
      }),
      catchError( () => {
        this.sendPostError()
        return of(false);
      })
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

      this.sendPost(postToSend, this.chat)
        .subscribe( () => this.loading = false)
        
    } else {
      this.errorService.displayError('Le message ne peut pas être vide et doit contenir moins de 500 caractères.')
    }
    
  }

  // Méthode pour charger plus de messages à l'appui du bouton.
  onLoadMore(): void {
    this.loading = true;
    const skip = this.chat.length;

    this.postService.getPreviousPosts(this.otherUser.id, skip).pipe(
      tap( (posts) => {
        this.chat = [...posts, ...this.chat];
        this.loading = false
      }),
      catchError( () => {
        this.errorService.displayError('Erreur lors du chargement des messages précédents.')
        this.loading = false
        return of(false)
      }),
      
    ).subscribe()
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
