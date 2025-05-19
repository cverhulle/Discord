import { Component } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-homepage-group-message',
  imports: [
    SharedModule,
    RouterLink
  ],
  templateUrl: './homepage-group-message.component.html',
  styleUrl: './homepage-group-message.component.scss'
})
export class HomepageGroupMessageComponent {

  constructor(private router: Router) {}

  onJoinAGroup(): void{
    this.router.navigateByUrl('/group-message/join-a-group')
  }
}
