import { Component } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { SharedModule } from '../../../shared/shared.module';
import { usernameImage } from '../../models/username-image.models';
import { debounce, debounceTime, Subject } from 'rxjs';

@Component({
  selector: 'app-private-message-homepage',
  imports: [
    FormsModule,
    SharedModule
  ],
  templateUrl: './private-message-homepage.component.html',
  styleUrl: './private-message-homepage.component.scss'
})
export class PrivateMessageHomepageComponent {
  // Contient la requete de l'utilisateur
  searchQuery!: string;
  
  // Variable pour contenir la liste des utilisateurs correspondant à la requete
  users!: usernameImage[];

  // On crée un Subject pour réagir aux changements sur le formulaire
  private searchSubject: Subject<string> = new Subject();

  constructor() {
    this.searchQuery = '';
    this.users = [];

    this.searchSubject.pipe(
      debounceTime(1000)
    ).subscribe(query => {
      this.onSearch(query)
    })
  }

  
  // On lance la recherche dans le serveur
  onSearch(query: string): void {
    console.log(query)
  }

  // Au changement dans le champ de recherche, on lance cette méthode
  onInputChange(): void {
    this.searchSubject.next(this.searchQuery)
  }


}
