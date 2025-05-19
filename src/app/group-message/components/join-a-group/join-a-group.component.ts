import { Component } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-join-a-group',
  imports: [
    SharedModule,
    NgIf,
    NgFor
  ],
  templateUrl: './join-a-group.component.html',
  styleUrl: './join-a-group.component.scss'
})
export class JoinAGroupComponent {

}
