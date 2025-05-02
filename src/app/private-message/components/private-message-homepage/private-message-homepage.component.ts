import { Component, OnInit } from '@angular/core';
import { FormsModule} from '@angular/forms';
import { SharedModule } from '../../../shared/shared.module';
import { usernameImage } from '../../models/username-image.models';
import { catchError, debounceTime, Observable, of, Subject, switchMap, tap } from 'rxjs';
import { PrivateMessageService } from '../../service/private-message.service';
import { AsyncPipe, NgFor } from '@angular/common';
import { Router } from '@angular/router';
import { AvatarService } from '../../../shared/avatar/service/avatar.service';
import { DisplayService } from '../../../shared/display/service/display.service';


@Component({
  selector: 'app-private-message-homepage',
  imports: [
    FormsModule,
    SharedModule,
    NgFor,
    AsyncPipe
  ],
  templateUrl: './private-message-homepage.component.html',
  styleUrl: './private-message-homepage.component.scss'
})


export class PrivateMessageHomepageComponent implements OnInit{
  // Contient la requete de l'utilisateur
  searchQuery: string = ''
  
  // Observable pour contenir la liste des utilisateurs correspondant à la requete
  users!: Observable<usernameImage[]>

  // On crée un Observable pour réagir aux changements sur le formulaire
  searchSubject!: Observable<string>


  constructor(private privateMessage : PrivateMessageService,
              private router: Router,
              private avatarService: AvatarService,
              private displayService : DisplayService) {}

  ngOnInit(): void {
    this.initObservables()
    this.initSearchQuery()
  }

  // Initialisation des Observables
  private initObservables(): void{

    // Initialisation de l'Observable contenant les utilisateurs correspondant à la recherche
    this.users = this.privateMessage.users$

    // Initialisation de l'Observable pour réaliser la recherche
    this.searchSubject = this.privateMessage.searchSubject$
  }

  // Cette méthode permet de mettre à jour la liste des utilisateurs à l'émission de searchSubject
  private initSearchQuery(): void{
    this.searchSubject.pipe(
      debounceTime(1000),
      switchMap(query => this.privateMessage.searchQueryUsers(query).pipe(
        catchError(() => {
          this.displayService.displayMessage('Erreur lors de la recherche des utilisateurs.');
          this.privateMessage.setValueOfUsersSubject([])
          return of([]);
        }),
        tap(users => {
          users.forEach(user => this.avatarService.updateImageError(user.username, false));
          this.privateMessage.setValueOfUsersSubject(users)
        })
      ))
    ).subscribe();
  }

  // Au changement dans le champ de recherche, on lance cette méthode
  onInputChange(): void {
    this.privateMessage.updateSearchQuery(this.searchQuery)
  }

  // Met l'imageError du service à true pour l'utilisateur.
  setImageError(user: usernameImage): void {
    this.avatarService.updateImageError(user.username, true)
  }

  // Si l'image ne peut pas être chargée, on modifie l'Url du profil par l'Url par défaut.
  getProfileImage(user: usernameImage): string {
    return this.avatarService.getProfileImage(user.image, user.username)
  }

  // Cette méthode permet d'être rediriger vers le chat privé correspondant
  onChat(user: usernameImage): void {
    this.router.navigate(['/private-message/chat'], {state: {id: user.id, username: user.username, image: user.image} })
  }

}
