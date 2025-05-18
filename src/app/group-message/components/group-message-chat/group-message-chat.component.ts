import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AsyncPipe, NgFor, NgIf, NgStyle } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { catchError, Observable, of, tap } from 'rxjs';

import { usernameImage } from '../../../private-message/models/username-image.models';
import { GroupPost } from '../../models/group-post.model';

import { AvatarService } from '../../../shared/avatar/service/avatar.service';
import { UserService } from '../../../shared/post/services/user.service';
import { DisplayService } from '../../../shared/display/service/display.service';
import { EmojisService } from '../../../shared/emojis/services/emojis.service';
import { ImageService } from '../../../shared/image/services/image.services';
import { GroupMessageService } from '../../services/group-message-chat.service';

import { SharedModule } from '../../../shared/shared.module';

import { TimeAgoPipe } from '../../../shared/post/pipe/time-ago.pipe';




@Component({
  selector: 'app-group-message-chat',
  imports: [
    AsyncPipe,
    NgIf,
    NgFor,
    SharedModule,
    NgStyle,
    TimeAgoPipe,
    FormsModule
  ],
  templateUrl: './group-message-chat.component.html',
  styleUrl: './group-message-chat.component.scss'
})
export class GroupMessageChatComponent implements OnInit{
  // Directive pour scroller el chat en bas après l'envoi d'un nouveau message.
  @ViewChild('chatContainer') chatContainer!: ElementRef
  
  // Variable pour récupérer le nom du groupe
  groupName$!: Observable<string>;

  // Variable pour récupérer le logo du groupe
  groupLogo$!:  Observable<string>;

  // Variable pour stocker l'id du groupe
  groupId$!:  Observable<string>;

  // Variable pour récupérer le texte dans le message.
  messageContent: string = ''

  // Observable qui stocke la discussion entre les utilisateurs
  chat$!: Observable<GroupPost[]>

  // Observable pour gérer le loading
  loading$!: Observable<boolean>

  // Variable pour vérifier si l'historique de discussion entre deux utilisateurs est vide ou non
  isChatEmpty$!: Observable<boolean>

  // Observable pour réagir lorsque l'utilisateur modifie un message.
  editMessage$!: Observable<GroupPost | null>;

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
              private userService : UserService,
              private displayService : DisplayService,
              private emojisService : EmojisService,
              private imageService : ImageService,
              private groupMessageService : GroupMessageService) {}

  
  ngOnInit(): void {
    this.groupMessageService.setValueOfLoading(false)
    this.initCurrentUserAndGroupInfos()
    if (this.groupMessageService.getValueOfGroupNameSubject() !== '') {
      this.initChat(this.groupMessageService.getValueOfGroupIdSubject())
      this.initObservable()
      this.initEmojis()
      this.resetAllSubject()
    }

  }

  // Cette méthode permet d'initialiser les données de l'utilisateur et du groupe
  private initCurrentUserAndGroupInfos() : void{
    this.initCurrentUser()
    this.initGroupInfos()
  }

  // Cette méthode permet d'initialiser le currentUser
  private initCurrentUser() : void {
    this.userService.getCurrentUser().pipe(
        tap( user => this.currentUser = user),
        catchError( () => {
          this.displayService.displayMessage('Erreur lors de la récupération des données de l\'utilisateur.')
          return of(false)
        })
    ).subscribe()
  }

  // Cette méthode permet d'initialiser le nom du groupe
  private initGroupInfos(): void {
    try {
      this.groupMessageService.setValueOfGroupName(history.state.groupName);
      this.groupMessageService.setValueOfGroupLogo(history.state.groupLogoPath);
      this.groupMessageService.setValueOfGroupId(history.state.groupId);
    } catch (error) {
      this.displayService.displayMessage('Erreur lors de la récupération du nom du groupe.');
    }
  }

  // Cette méthode initialise l'historique de la discussion du groupe : on ne récupère que les 10 derniers messages.
  private initChat(groupId: string): void {
    this.groupMessageService.initChat(groupId).subscribe(
      () => {
        this.groupMessageService.setValueOfLoading(false)
        this.scrollToBottom()
      }
    )
  }

  // Cette méthode initialise les observables pour réagir aux modifications de message.
  private initObservable(): void {
    // On initialise l'Observable pour la modification de messages.
    this.editMessage$ = this.groupMessageService.editMessage$

    this.editMessage$.subscribe( (post) => {
      this.messageContent = post?.content ? post?.content : ''
      this.scrollToBottom()
    })
    

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
    this.isChatEmpty$ = this.groupMessageService.isChatEmpty$

    // On initialise l'Observable pour le loading
    this.loading$ = this.groupMessageService.loading$

    // On initialise l'Observable du chat
    this.chat$ = this.groupMessageService.chat$

    // On intialise l'Observable du groupId
    this.groupId$ = this.groupMessageService.groupId$

    // On intialise l'Observable du groupName
    this.groupName$ = this.groupMessageService.groupName$

    // On intialise l'Observable du groupLogo
    this.groupLogo$ = this.groupMessageService.groupLogo$
  }

  // Méthode pour initialiser les catégories d'émojis à ne pas charger.
  private initEmojis(): void {
    this.categoriesEmojisExcluded = this.emojisService.categoryExcluded()
  }

  // Méthode pour réinitialiser l'image à envoyer
  private resetAllSubject(): void {
    this.groupMessageService.resetModifiedPostStuff()
  }

  // Méthode pour éditer un message.
  onEditMessage(post : GroupPost) {
    this.groupMessageService.setValueOfEditMessage(post)
  }

  // Méthode pour annuler la modification d'un message
  onNotModify() : void{
    this.groupMessageService.resetModifiedPostStuff()
  }

  // Méthode pour mettre à jour le contenu d'un post.
  private updateMessage(editedPost : GroupPost): void {
    if (!editedPost.postId) {
      this.displayService.displayMessage('ID du message non disponible.')
      return;
    }

    this.groupMessageService.updatePost(editedPost, this.messageContent, this.imageService.getValueOfImageToSend(), this.imageService.getValueOfDeleteImageInModifiedPost()).subscribe()
      
  }


  // Méthode au clic sur le bouton envoi.
  onSendMessage(): void{
    if (this.groupMessageService.messageValid(this.messageContent)) {
      this.groupMessageService.setValueOfLoading(true)

      const postToEdit = this.groupMessageService.getValueOfEditMessageSubject();
      // Si l'on édite un post, on lance la méthode adaptée et on quitte la boucle.
      if (postToEdit !== null) {
        this.updateMessage(postToEdit);
        this.groupMessageService.setValueOfLoading(false)
        return;
      }
      
      // On crée le formData grâce au service
      const formData = this.groupMessageService.createFormDataToSend(
        this.groupMessageService.getValueOfGroupIdSubject(),
        this.currentUser.id,
        this.currentUser.username,
        this.currentUser.image,
        this.messageContent,
        this.imageService.getValueOfImageToSend()
      )

      // On envoie le post grâce au service et au FormData
      this.groupMessageService.sendPost(formData)
          .subscribe((result) => {
            // Mis à jour des éléments
            this.messageContent = result.updatedMessageContent;
            this.groupMessageService.setValueOfLoading(false)
            this.scrollToBottom();
        });
       
        
    } else {
      this.displayService.displayMessage('Le message ne peut pas être vide et doit contenir moins de 500 caractères.')
    }
  }

  // Méthode pour charger plus de messages à l'appui du bouton.
  onLoadMoreMessages(): void {
    this.groupMessageService.loadMoreMessages(this.groupMessageService.getValueOfGroupIdSubject()).subscribe()
  } 

  // Méthode pour supprimer un message.
  onDeleteMessage(post : GroupPost) {
    if (!post.postId) {
      this.displayService.displayMessage('ID du message non disponible.');
      return; 
    }

    this.groupMessageService.deletePost(post.postId).subscribe(
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
    this.groupMessageService.removeImageInPost()
  }


  // Scroll de l'écran après l'envoi d'un nouveau message.
  private scrollToBottom(): void {
    setTimeout(() => {
      this.chatContainer.nativeElement.scrollTop = this.chatContainer.nativeElement.scrollHeight;
    }, 200);
  }

  // Si l'image ne peut pas être chargée, on modifie l'Url du profil par l'Url par défaut.
  getProfileImage(post: GroupPost): string {
    return this.avatarService.getProfileImage(post.senderProfileImage, post.senderUsername)
  }

  // Met l'imageError du service à true pour l'utilisateur.
  setImageError(post: GroupPost): void {
    this.avatarService.updateImageError(post.senderUsername, true)
  }

  // Récupérer la couleur de la mat-card
  getPostCardColor(postsenderId: string) : string {
    return this.groupMessageService.getPostCardColor(postsenderId, this.currentUser.id)
  }

}
