import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { usernameImage } from '../../models/username-image.models';
import { ProfileService } from '../../../profile/service/profile.service';
import { Observable, tap } from 'rxjs';
import { SharedModule } from '../../../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { Post } from '../../../shared/post/models/post.model';
import { AvatarService } from '../../../shared/avatar/service/avatar.service';
import { PostService } from '../../../shared/post/services/post.service';
import { NgFor, NgIf, NgStyle } from '@angular/common';
import { TimeAgoPipe } from '../../../shared/post/pipe/time-ago.pipe';
import { MatSnackBar } from '@angular/material/snack-bar';


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
  messageContent!: string;

  // Variable pour stocker le post à envoyer au backend
  post!: Post

  // Variable qui stocke la discussion entre les utilisateurs
  chat: Post[] = []

  // Variable pour vérifier si l'historique de discussion entre deux utilisateurs est vide ou non
  chatIsEmpty!: boolean

  constructor(private profileService : ProfileService,
              private avatarService : AvatarService,
              private postService : PostService,
              private matSnackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.initCurrentUser()
    this.initOtherUser()
    this.initChat(this.otherUser.id)
  }



  // Cette méthode initialise les données de l'utilisateur actuellement connecté
  private initCurrentUser(): void {
    this.currentUser = new usernameImage();

    this.profileService.getProfile().pipe(
      tap((profile) => {
        this.currentUser['id']= profile.user._id,
        this.currentUser['username']=profile.user.loginInfo.username,
        this.currentUser['image']=profile.user.image
        
      })
    ).subscribe()
  }



  // Cette méthode initialise les données de l'utilisateur avec lequel on va communiquer.
  private initOtherUser(): void {
    this.otherUser = new usernameImage();
    this.otherUser['id'] = history.state['id'],
    this.otherUser['username'] = history.state['username'],
    this.otherUser['image'] = history.state['image']
  }



  // Cette méthode initialise l'historique de la discussion entre les utilisateurs
  private initChat(otherUserId: string): void {
    this.loading = true
    this.postService.getAllPosts(otherUserId).pipe(
      tap( (posts) => {
        this.chat = posts;
        this.chatIsEmpty = this.chat.length === 0;
        this.loading = false
      })
    ).subscribe()
  }



  // Création du post à envoyer au backend.
  private createPostToSend(): void {
    this.post = {
      currentUserId : this.currentUser.id,
      otherUserId : this.otherUser.id,
      username : this.currentUser.username,
      image : this.currentUser.image,
      content : this.messageContent,
      timestamp : new Date()
    }
  }



  // Méthode pour envoyer le post au service.
  private sendPost(): Observable<boolean> {
    return this.postService.sendPost(this.post).pipe(
      tap( send => {
        if (send) {
          console.log("Message envoyé")

          // On réinitialise le formulaire
          this.messageContent = ''

          // On ajoute le message au chat et on reteste si le chat est vide ou non.
          this.chat.push(this.post)
          this.chatIsEmpty = this.chat.length === 0

        } else {
          console.log("Le message ne s'est pas envoyé.")
        }
      })
    )
  }



  // Méthode au clic sur le bouton envoi.
  onSendMessage(): void{
    this.loading = true
    this.createPostToSend()
    this.sendPost().subscribe( () => {
      this.loading = false
      this.scrollToBottom();
    })
    
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

  // Méthode pour afficher un message d'erreur lors de l'envoi d'un message.
  private displayError(message: string): void {
    this.matSnackBar.open(message, 'Fermer', {
      duration: 3000,
      verticalPosition: 'top',
      horizontalPosition: 'center'
    });
  }

}
