import { Component, OnInit } from '@angular/core';
import { GroupFormInfo } from '../../models/group-info.model';
import { SearchAGroupService } from '../../services/search-a-group.service';
import { Observable } from 'rxjs';
import { SharedModule } from '../../../shared/shared.module';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-my-group',
  imports: [
    SharedModule,
    AsyncPipe
  ],
  templateUrl: './my-group.component.html',
  styleUrl: './my-group.component.scss'
})
export class MyGroupComponent implements OnInit {
  // Observable pour stocker les différents groupes de l'utilisateur
  groups$!: Observable<GroupFormInfo[]>

  constructor(private searchAGroupService : SearchAGroupService) {}

  ngOnInit(): void {
    this.groups$ = this.searchAGroupService.currentUserGroup$
    this.searchAGroupService.getUsersGroups().subscribe()
  }
}
