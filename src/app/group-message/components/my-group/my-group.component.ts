import { Component, OnInit } from '@angular/core';
import { GroupFormInfo } from '../../models/group-info.model';
import { SearchAGroupService } from '../../services/search-a-group.service';

@Component({
  selector: 'app-my-group',
  imports: [],
  templateUrl: './my-group.component.html',
  styleUrl: './my-group.component.scss'
})
export class MyGroupComponent implements OnInit {
  // Variable pour stocker les différents groupes de l'utilisateur
  groups!: GroupFormInfo[]

  constructor(private searchAGroupService : SearchAGroupService) {}

  ngOnInit(): void {
    
  }
}
