import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomepageComponent } from "./homepage/components/homepage/homepage.component";
import { HeaderComponent } from "./core/components/header/header.component";


@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    HomepageComponent,
    HeaderComponent
],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})

export class AppComponent {
  title = 'Discord';
}
