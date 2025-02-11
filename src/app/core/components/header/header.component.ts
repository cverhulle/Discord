import { Component } from '@angular/core';
import { CoreModule } from '../../core.module';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [
    CoreModule,
    RouterLink
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

}
