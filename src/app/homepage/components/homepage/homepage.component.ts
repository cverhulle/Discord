import { Component } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';

@Component({
  selector: 'app-homepage',
  imports: [
    SharedModule
  ],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss'
})
export class HomepageComponent {
  // Méthode redirigeant vers la page pour créer un compte
  onCreateAccount(): void{
    
  }
}
