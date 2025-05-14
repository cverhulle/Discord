import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import { catchError, Observable, of, tap } from 'rxjs';

import { usernameImage } from '../../../private-message/models/username-image.models';
import { GroupPost } from '../../models/group-post.model';

import { AvatarService } from '../../../shared/avatar/service/avatar.service';
import { UserService } from '../../../shared/post/services/user.service';
import { DisplayService } from '../../../shared/display/service/display.service';
import { EmojisService } from '../../../shared/emojis/services/emojis.service';
import { ImageService } from '../../../shared/image/services/image.services';
import { GroupMessageService } from '../../services/group-message-chat.service';


@Component({
  selector: 'app-group-message-chat',
  imports: [],
  templateUrl: './group-message-chat.component.html',
  styleUrl: './group-message-chat.component.scss'
})
export class GroupMessageChatComponent implements OnInit{
  // Directive pour scroller el chat en bas après l'envoi d'un nouveau message.
  @ViewChild('chatContainer') chatContainer!: ElementRef
  
  // Variable pour récupérer les données de l'utilisateur actuel.
  currentUser!: usernameImage;




  // Variable pour récupérer le nom du groupe
  groupName : string = '';

  // Variable pour récupérer le logi du groupe
  groupLogo : string = '';

  // Variable pour stocker l'id du groupe
  groupId : string = '';




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
  }

  // Cette méthode permet d'initialiser les données de l'utilisateur et du groupe
  private initCurrentUserAndGroupInfos() : void{
    this.initCurrentUser()
    this.initGroupInfos()
    if (this.groupName !== '') {
      this.initChat(this.groupId)
    }
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
      this.groupName = history.state.groupName;
      this.groupLogo = history.state.groupLogoPath
      this.groupId = history.state.groupId
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







  // Scroll de l'écran après l'envoi d'un nouveau message.
  private scrollToBottom(): void {
    setTimeout(() => {
      this.chatContainer.nativeElement.scrollTop = this.chatContainer.nativeElement.scrollHeight;
    }, 200);
  }


}
