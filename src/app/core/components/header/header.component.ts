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
  token!: string| null

  constructor(private tokenService : TokenService) {}

  ngOnInit(): void {
    this.token = this.tokenService.getUserId()
  }

}
