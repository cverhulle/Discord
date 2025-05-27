import { Component, OnInit } from '@angular/core';
import { GroupFormInfo } from '../../models/group-info.model';
import { SearchAGroupService } from '../../services/search-a-group.service';
import { Observable } from 'rxjs';
import { SharedModule } from '../../../shared/shared.module';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { GroupMessageService } from '../../services/group-message-chat.service';

@Component({
  selector: 'app-my-group',
  imports: [
    SharedModule,
    AsyncPipe,
    NgIf,
    NgFor
  ],
  templateUrl: './my-group.component.html',
  styleUrl: './my-group.component.scss'
})
export class MyGroupComponent implements OnInit {
  // Observable pour stocker les différents groupes de l'utilisateur
  groups$!: Observable<GroupFormInfo[]>

  constructor(private searchAGroupService : SearchAGroupService,
              private router: Router,
              private groupMessageService : GroupMessageService) {}

  ngOnInit(): void {
    this.groups$ = this.searchAGroupService.currentUserGroup$
    this.searchAGroupService.getUsersGroups().subscribe()
  }

  // Cette méthode permet d'afficher le chat après appui sur le bouton "Message"
  onChat(group : GroupFormInfo) {
      this.groupMessageService.clearUserColors()
      this.router.navigate(['/group-message/chat'], { state: {
      groupName: group.groupName,
      groupLogoPath: group.groupLogoPath,
      groupId: group._id 
      }
  });
  }
}
