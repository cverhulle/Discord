import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SharedModule } from '../../../shared/shared.module';
import { TokenService } from '../../../interceptors/services/auth.service';

@Component({
  selector: 'app-header',
  imports: [
    SharedModule,
    RouterLink,
    
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit{
  
  constructor(private tokenService : TokenService) {}

  ngOnInit(): void {
  
  }

  onLogout(): void {
    if(this.tokenService.isLogged()) {
      this.tokenService.removeToken()
      console.log('Utilisateur déconnecté')
    }
  }

  

}
