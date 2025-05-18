import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { catchError, Observable, of, tap } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { AsyncPipe, NgFor, NgIf, NgStyle } from '@angular/common';

import { SharedModule } from '../../../shared/shared.module';

import { usernameImage } from '../../models/username-image.models';
import { Post } from '../../../shared/post/models/post.model';

import { AvatarService } from '../../../shared/avatar/service/avatar.service';
import { PostService } from '../../../shared/post/services/post.service';
import { UserService } from '../../../shared/post/services/user.service';
import { DisplayService } from '../../../shared/display/service/display.service';
import { EmojisService } from '../../../shared/emojis/services/emojis.service';
import { ImageService } from '../../../shared/image/services/image.services';

import { TimeAgoPipe } from '../../../shared/post/pipe/time-ago.pipe';




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

  // Observable pour récupérer les données de l'utilisateur actuel.
  currentUser$!: Observable<usernameImage>

  // Variable pour récupérer les données de l'utilisateur à qui on envoie des messages.
  otherUser: usernameImage = {id: '', username: '', image: ''}

  // Variable pour récupérer le texte dans le message.
  messageContent: string = ''

  // Observable qui stocke la discussion entre les utilisateurs
  chat$!: Observable<Post[]>

  // Observable pour gérer le loading
  loading$!: Observable<boolean>

  // Variable pour vérifier si l'historique de discussion entre deux utilisateurs est vide ou non
  isChatEmpty$!: Observable<boolean>

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

  // Observable pour stocker la conversion en URL de l'image à envoyer
  imageToSendUrl$!: Observable<string | null>

  // Observable pour gérer l'opacité du bandeau de prévisualisation
  opacityPreview$!: Observable<number>

  constructor(private avatarService : AvatarService,
              private postService : PostService,
              private userService : UserService,
              private displayService : DisplayService,
              private emojisService : EmojisService,
              private imageService : ImageService) {}
                
               
                
              


  ngOnInit(): void {
    this.postService.setValueOfLoading(true)
    this.initUsers()
    if (this.otherUser.id !== '') {
      this.initChat(this.otherUser.id)
      this.initObservable()
      this.initEmojis()
      this.resetAllSubject()
    }
  }

  // Cette méthode initialise les données des utilisateurs de la discussion.
  private initUsers(): void {
    this.initCurrentUser(),
    this.initOtherUser()
  }

  // Cette méthode initialise les données de l'utilisateur actuellement connecté
  private initCurrentUser(): void {
    this.userService.initCurrentUser()
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
    this.postService.initChat(otherUserId).subscribe(
      () => {
        this.postService.setValueOfLoading(false)
        this.scrollToBottom()
      }
    )
  }

  // Cette méthode initialise l'observable pour réagir aux modifications de message.
  private initObservable(): void {
    // On initialise l'Observable pour la modification de messages.
    this.editMessage$ = this.postService.editMessage$

    this.editMessage$.subscribe( (post) => {
      this.messageContent = post?.content ? post?.content : ''
      this.scrollToBottom()
    })
    
    // On initialise l'Observable de l'utilisateur actuel
    this.currentUser$ = this.userService.currentUser$
    
    // On initialise l'Observable pour afficher le selecteur d'émotes.
    this.showEmojisList$= this.emojisService.showEmojisList$

    // On initialise l'Observable pour l'envoi d'image
    this.imageToSend$ = this.imageService.imageToSend$

    // On initialise l'Observable pour la suppression d'une image dans un Post à modifier
    this.deleteImageInModifiedPost$ = this.imageService.deleteImageInModifiedPost$

    // On initialise l'Observable pour la prévisualisation de l'image à envoyer.
    this.imageToSendUrl$ = this.imageService.imageToSendUrl$

    // On initialise l'Observable pour gérer l'opacité du bandeau de prévisualisation
    this.opacityPreview$ = this.imageService.opacityPreview$

    // On initialise l'Observable pour vérifier si le chat est vide ou non
    this.isChatEmpty$ = this.postService.isChatEmpty$

    // On initialise l'Observable pour le loading
    this.loading$ = this.postService.loading$

    // On initialise l'Observable du chat
    this.chat$ = this.postService.chat$
  }

  // Méthode pour initialiser les catégories d'émojis à ne pas charger.
  private initEmojis(): void {
    this.categoriesEmojisExcluded = this.emojisService.categoryExcluded()
  }

  // Méthode pour réinitialiser l'image à envoyer
  private resetAllSubject(): void {
    this.postService.resetModifiedPostStuff()
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

    this.postService.updatePost(editedPost, this.messageContent, this.imageService.getValueOfImageToSend(), this.imageService.getValueOfDeleteImageInModifiedPost()).subscribe()
      
  }
  

  // Méthode au clic sur le bouton envoi.
  onSendMessage(): void{
    if (this.postService.messageValid(this.messageContent)) {
      this.postService.setValueOfLoading(true)

      const postToEdit = this.postService.getValueOfEditMessageSubject();
      // Si l'on édite un post, on lance la méthode adaptée et on quitte la boucle.
      if (postToEdit !== null) {
        this.updateMessage(postToEdit);
        this.postService.setValueOfLoading(false)
        return;
      }
      
      // On crée le formData grâce au service
      const formData = this.postService.createFormDataToSend(
        this.currentUser.id,
        this.otherUser.id,
        this.currentUser.username,
        this.messageContent,
        this.currentUser.image,
        this.imageService.getValueOfImageToSend()
      )

      // On envoie le post grâce au service et au FormData
      this.postService.sendPost(formData, this.imageService.getValueOfImageToSend())
          .subscribe((result) => {
            // Mis à jour des éléments
            this.messageContent = result.updatedMessageContent;
            this.postService.setValueOfLoading(false)
            this.scrollToBottom();
        });
       
        
    } else {
      this.displayService.displayMessage('Le message ne peut pas être vide et doit contenir moins de 500 caractères.')
    }
    
  }

  // Méthode pour charger plus de messages à l'appui du bouton.
  onLoadMoreMessages(): void {
    this.postService.loadMoreMessages(this.otherUser.id).subscribe()
  } 

  // Méthode pour supprimer un message.
  onDeleteMessage(post : Post) {
    if (!post.postId) {
      this.displayService.displayMessage('ID du message non disponible.');
      return; 
    }

    this.postService.deletePost(post.postId).subscribe(
      () => {
        this.scrollToBottom()
      }
    )
  }

  // Méthode pour gérer l'opacité du bandeau de prévisualisation
  onSetOpacity(): void{
    this.imageService.setValueOfOpacity()
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
