import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./core/components/header/header.component";
import { TokenService } from './interceptors/services/auth.service';


@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    HeaderComponent
],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})

export class AppComponent implements OnInit{
  title = 'Discord';

  constructor(private tokenService: TokenService) {}

  ngOnInit(): void {
      this.tokenService.handleTokenValidity();
  }
}
