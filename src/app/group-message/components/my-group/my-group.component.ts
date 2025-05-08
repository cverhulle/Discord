import { Component } from '@angular/core';
import { GroupFormInfo } from '../../models/group-info.model';

@Component({
  selector: 'app-my-group',
  imports: [],
  templateUrl: './my-group.component.html',
  styleUrl: './my-group.component.scss'
})
export class MyGroupComponent {
  // Variable pour stocker les différents groupes de l'utilisateur
  groups!: GroupFormInfo[]
}
