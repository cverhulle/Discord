import { Component } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { Router } from '@angular/router';

@Component({
  selector: 'app-homepage',
  imports: [
    SharedModule
  ],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss'
})
export class HomepageComponent {

  constructor(  private router: Router) {}

  // Méthode redirigeant vers la page pour créer un compte
  onCreateAccount(): void{
    this.router.navigateByUrl('/login/register')
  }
}
