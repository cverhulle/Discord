import { Component } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { SharedModule } from '../../../shared/shared.module';
import { usernameImage } from '../../models/username-image.models';

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

  constructor() {
    this.searchQuery = '',
    this.users = []
  }

  onSearch(): void {
    
  }


}
