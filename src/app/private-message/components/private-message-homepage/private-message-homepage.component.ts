import { Component } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { SharedModule } from '../../../shared/shared.module';

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
  
}
