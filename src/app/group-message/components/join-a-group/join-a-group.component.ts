import { Component } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-join-a-group',
  imports: [
    SharedModule,
    FormsModule
  ],
  templateUrl: './join-a-group.component.html',
  styleUrl: './join-a-group.component.scss'
})
export class JoinAGroupComponent {

}
