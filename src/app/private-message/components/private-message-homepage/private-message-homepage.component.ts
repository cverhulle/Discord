import { Component, OnInit } from '@angular/core';
import { FormsModule} from '@angular/forms';
import { SharedModule } from '../../../shared/shared.module';
import { usernameImage } from '../../models/username-image.models';
import { catchError, debounceTime, of, Subject, switchMap, tap } from 'rxjs';
import { PrivateMessageService } from '../../service/private-message.service';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-private-message-homepage',
  imports: [
    FormsModule,
    SharedModule,
    NgFor
  ],
  templateUrl: './private-message-homepage.component.html',
  styleUrl: './private-message-homepage.component.scss'
})


export class PrivateMessageHomepageComponent implements OnInit{
  // Contient la requete de l'utilisateur
  searchQuery: string = ''
  
  // Variable pour contenir la liste des utilisateurs correspondant à la requete
  users: usernameImage[] = []

  // Variable pour stocker l'URL des images de profil par défaut.
  defaultUrl: string = 'https://static.vecteezy.com/ti/vecteur-libre/p1/4274186-person-icon-user-interface-icon-silhouette-of-man-simple-symbol-a-glyph-symbol-in-your-web-site-design-logo-app-ui-webinar-video-chat-ect-vectoriel.jpg'

  // Dictionnaire pour stocker les erreurs de chargement d'image.
  imageErrors: { [key: string] : boolean } = {}

  // On crée un Subject pour réagir aux changements sur le formulaire
  private searchSubject: Subject<string> = new Subject();


  constructor(
    private privateMessage : PrivateMessageService) {}

  ngOnInit(): void {

    this.searchSubject.pipe(
      debounceTime(1000),
      switchMap(query => this.privateMessage.searchQueryUsers(query).pipe(
        catchError(error => {
          console.log('Erreur lors de la recherche.');
          this.users = [];
          return of([]);      
        }),
        tap(users => {
          console.log('La recherche est terminée.')
          this.users = users
          this.users.forEach(user => {
            this.imageErrors[user.username] = false
          })
        })
      ))
    ).subscribe()
  }

  
  // Au changement dans le champ de recherche, on lance cette méthode
  onInputChange(): void {
    this.searchSubject.next(this.searchQuery)
  }

  getProfileImage(user: usernameImage): string {
    return this.imageErrors[user.username] ? this.defaultUrl : user.image
  }


}
