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
  userId!: string| null

  constructor(private tokenService : TokenService) {}

  ngOnInit(): void {
    this.userId = this.tokenService.getUserId()
  }

  onChargeUserId(): void {
    if(this.tokenService.isLogged()) {
      this.userId = this.tokenService.getUserId()
    } else {
      this.userId = '67b5d75126a7c6922f7db331'
    }

  }

}
