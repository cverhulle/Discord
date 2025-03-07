import { Component, OnInit } from '@angular/core';
import { FormsModule} from '@angular/forms';
import { SharedModule } from '../../../shared/shared.module';
import { usernameImage } from '../../models/username-image.models';
import { catchError, debounceTime, of, Subject, switchMap, tap } from 'rxjs';
import { PrivateMessageService } from '../../service/private-message.service';
import { NgFor } from '@angular/common';
import { Router } from '@angular/router';
import { AvatarService } from '../../../shared/avatar/service/avatar.service';

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

  // On crée un Subject pour réagir aux changements sur le formulaire
  private searchSubject: Subject<string> = new Subject();


  constructor(
    private privateMessage : PrivateMessageService,
    private router: Router,
    private avatarService: AvatarService) {}

  ngOnInit(): void {
    this.initSubjectQuery()
    
  }

  private initSubjectQuery(): void {
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
            this.avatarService.updateImageError(user.username, false)
          })
        })
      ))
    ).subscribe()
  }

  
  // Au changement dans le champ de recherche, on lance cette méthode
  onInputChange(): void {
    this.searchSubject.next(this.searchQuery)
  }

  // Met l'imageError du service à true pour l'utilisateur.
  setImageError(user: usernameImage): void {
    this.avatarService.updateImageError(user.username, true)
  }

  // Si l'image ne peut pas être chargée, on modifie l'Url du profil par l'Url par défaut.
  getProfileImage(user: usernameImage): string {
    return this.avatarService.getProfileImage(user)
  }

  onChat(user: usernameImage): void {
    this.router.navigate(['/private-message/chat'], {state: {id: user.id, username: user.username, image: user.image} })
  }

}
