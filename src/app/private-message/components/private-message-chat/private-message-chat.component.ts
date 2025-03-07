import { Component, OnInit } from '@angular/core';
import { usernameImage } from '../../models/username-image.models';
import { ProfileService } from '../../../profile/service/profile.service';
import { Observable, tap } from 'rxjs';
import { SharedModule } from '../../../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { Post } from '../../../shared/post/models/post.model';
import { AvatarService } from '../../../shared/avatar/service/avatar.service';
import { PostService } from '../../../shared/post/services/post.service';


@Component({
  selector: 'app-private-message-chat',
  imports: [
    SharedModule,
    FormsModule
  ],
  templateUrl: './private-message-chat.component.html',
  styleUrl: './private-message-chat.component.scss'
})


export class PrivateMessageChatComponent implements OnInit{
  // Variable pour récupérer les données de l'utilisateur actuel.
  currentUser!: usernameImage;

  // Variable pour récupérer les données de l'utilisateur à qui on envoie des messages.
  otherUser!: usernameImage;

  // Variable pour récupérer le texte dans le message.
  messageContent!: string;

  // Variable pour stocker le post à envoyer au backend
  post!: Post

  constructor(private profileService : ProfileService,
              private avatarService : AvatarService,
              private postService : PostService) {}

  ngOnInit(): void {
    this.initCurrentUser()
    this.initOtherUser()
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

  // Création du post à envoyer au backend.
  private createPostToSend(): void {
    this.post = {
      id : this.currentUser.id,
      username : this.currentUser.username,
      image : this.avatarService.getProfileImage(this.currentUser),
      content : this.messageContent,
      timestamp : new Date()
    }
  }

  // Envoi du post
  private sendPost(): Observable<boolean> {
    return this.postService.sendPost(this.post).pipe(
      tap( send => {
        if (send) {
          console.log("Message envoyé")
          this.messageContent = ''
        } else {
          console.log("Le message ne s'est pas envoyé.")
        }
      })
    )
  }

  onSendMessage(): void{
    this.createPostToSend()
    this.sendPost().subscribe()
    
  }

}
