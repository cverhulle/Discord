import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { catchError, Observable, of, tap } from 'rxjs';



import { FormsModule } from '@angular/forms';
import { AsyncPipe, NgFor, NgIf, NgStyle } from '@angular/common';
import { SharedModule } from '../../../shared/shared.module';

import { usernameImage } from '../../models/username-image.models';
import { Post } from '../../../shared/post/models/post.model';

import { AvatarService } from '../../../shared/avatar/service/avatar.service';
import { PostService } from '../../../shared/post/services/post.service';

import { TimeAgoPipe } from '../../../shared/post/pipe/time-ago.pipe';
import { UserService } from '../../../shared/post/services/user.service';
import { DisplayService } from '../../../shared/display/service/display.service';
import { EmojisService } from '../../../shared/emojis/services/emojis.service';
import { ImageService } from '../../../shared/image/services/image.services';




@Component({
  selector: 'app-private-message-chat',
  imports: [
    SharedModule,
    FormsModule,
    NgFor,
    NgStyle,
    NgIf,
    TimeAgoPipe,
    AsyncPipe
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

  // Observable pour réagir lorsque l'utilisateur modifie un message.
  editMessage$!: Observable<Post | null>;

  // Observable pour gérer l'affichage du selecteur d'émotes.
  showEmojisList$!: Observable<boolean>

  // Variable pour stocker les catégories d'émojis à ne pas charger.
  categoriesEmojisExcluded!: [string] 

  // Observable pour gérer l'image à envoyer dans le Post.
  imageToSend$! : Observable<File | null>;

  // Observable pour gérer si une photo est supprimé dans le Post à modifier.
  deleteImageInModifiedPost$!: Observable<boolean>

  constructor(private avatarService : AvatarService,
              private postService : PostService,
              private userService : UserService,
              private displayService : DisplayService,
              private emojisService : EmojisService,
              private imageService : ImageService) {}
                
               
                
              


  ngOnInit(): void {
    this.initUsers()
    if (this.otherUser.id !== '') {
      this.initChat(this.otherUser.id)
      this.initObservable()
      this.initEmojis()
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
        this.scrollToBottom()
      }
    )
  }

  // Cette méthode initialise l'observable pour réagir aux modifications de message.
  private initObservable(): void {
    // On initialise l'Observable pour la modification de messages.
    this.editMessage$ = this.postService.editMessage$

    this.editMessage$.subscribe( (post) => {
      if (post) {
        this.displayService.displayMessage('Vous modifiez un message')
        this.messageContent = post.content
      } else {
        this.messageContent = ''
        this.scrollToBottom()
      }
    })

    // On initialise l'Observable pour afficher le selecteur d'émotes.
    this.showEmojisList$= this.emojisService.showEmojisList$

    // On initialise l'Observable pour l'envoi d'image
    this.imageToSend$ = this.imageService.imageToSend$

    // On initialise l'Observable pour la suppression d'une image dans un Post à modifier
    this.deleteImageInModifiedPost$ = this.imageService.deleteImageInModifiedPost$
  }

  // Méthode pour initialiser les catégories d'émojis à ne pas charger.
  private initEmojis(): void {
    this.categoriesEmojisExcluded = this.emojisService.categoryExcluded()
  }

  // Méthode pour éditer un message.
  onEditMessage(post : Post) {
    this.postService.setValueOfEditMessage(post)
  }

  // Méthode pour annuler la modification d'un message
  onNotModify() : void{
    this.postService.resetModifiedPostStuff()
  }

  // Méthode pour mettre à jour le contenu d'un post.
  private updateMessage(editedPost : Post): void {
    if (!editedPost.postId) {
      this.displayService.displayMessage('ID du message non disponible.')
      return;
    }

    this.postService.updatePost(editedPost, this.messageContent, this.imageService.getValueOfImageToSend(), this.imageService.getValueOfDeleteImageInModifiedPost()).subscribe( (updatedPost) => {
      const messageIndex = this.chat.findIndex(post => post.postId === updatedPost.postId);
      this.chat[messageIndex] = updatedPost;
      this.postService.resetModifiedPostStuff()
    })
  }

  // Méthode au clic sur le bouton envoi.
  onSendMessage(): void{
    if (this.postService.messageValid(this.messageContent)) {
      this.loading = true

      const postToEdit = this.postService.getValueOfEditMessageSubject();
      // Si l'on édite un post, on lance la méthode adaptée et on quitte la boucle.
      if (postToEdit !== null) {
        this.updateMessage(postToEdit);
        this.loading = false;
        return;
      }
      
      // On crée le formData grâce au service
      console.log(this.imageService.getValueOfImageToSend())
      const formData = this.postService.createFormDataToSend(
        this.currentUser.id,
        this.otherUser.id,
        this.currentUser.username,
        this.messageContent,
        this.currentUser.image,
        this.imageService.getValueOfImageToSend()
      )

      // On envoie le post grâce au service et au FormData
      this.postService.sendPost(formData, this.chat, this.imageService.getValueOfImageToSend())
          .subscribe((result) => {
            // Mis à jour des éléments
            this.chat = result.updatedChat;
            this.chatIsEmpty = result.updatedChatIsEmpty;
            this.messageContent = result.updatedMessageContent;
            this.imageService.setImageToSend(result.updatedImageToSend);
            this.loading = false;
            this.scrollToBottom();
        });
       
        
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

  // Méthode pour supprimer un message.
  onDeleteMessage(post : Post) {
    if (!post.postId) {
      this.displayService.displayMessage('ID du message non disponible.');
      return; 
    }

    this.loading = true

    this.postService.deletePost(post.postId, this.chat).subscribe(
      (updatedChat) => {
        this.chat = updatedChat
        this.loading = false
        this.scrollToBottom()
      }
    )


  }

    // Méthode pour ouvrir la roue d'émoticones
    onOpenEmojisList() : void{
      this.emojisService.openEmojisList()
    }
    
    // Méthode pour ajouter l'émote dans le message de l'utilisateur.
    onEmojiClick(event: any): void {
      this.messageContent = this.emojisService.addEmojisToMessage(event, this.messageContent)
    }

    
    // Méthode à déclencher au clic sur une image. 
    onImageToSend(event : Event): void {
      this.imageService.getImageToSend(event)      
    }

    // Méthode pour retirer l'image dans le Post
    onRemoveImage(): void {
      this.postService.removeImageInPost()
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
    getPostCardColor(postCurrentUserId: string) : string {
      return this.postService.getPostCardColor(postCurrentUserId, this.currentUser.id)
    }






}
