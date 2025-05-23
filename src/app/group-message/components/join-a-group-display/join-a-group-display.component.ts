import { Component, OnInit } from '@angular/core';
import { JoinAGroupService } from '../../services/join-a-group.service';
import { Observable } from 'rxjs';
import { GroupFormInfo } from '../../models/group-info.model';
import { SharedModule } from '../../../shared/shared.module';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { DisplayService } from '../../../shared/display/service/display.service';

@Component({
  selector: 'app-join-a-group-display',
  imports: [
    SharedModule,
    NgIf,
    NgFor,
    AsyncPipe
  ],
  templateUrl: './join-a-group-display.component.html',
  styleUrl: './join-a-group-display.component.scss'
})
export class JoinAGroupDisplayComponent implements OnInit {

  // Observable pour récupérer la liste des groupes correspondant à la recherche
  groups$!: Observable<GroupFormInfo[]>

  constructor(  private joinAGroupService : JoinAGroupService,
                private displayService : DisplayService) {}

  ngOnInit(): void {
    this.initObservables()
  }

  // Cette méthode permet d'initialiser l'Observable "stockant" les groupes répondant à la requete.
  private initObservables(): void{
    this.groups$ = this.joinAGroupService.joinAGroup$
  }

  // Cette méthode se déclenche à l'appui sur le bouton "rejoindre un groupe"
  onJoinGroup(group : GroupFormInfo): void {

    // Si le groupe est privé, on affiche un message d'erreur
    if (group.groupType === 'Privé') {
      this.displayService.displayMessage("Ce groupe est privé. Vous ne pouvez pas le rejoindre.");
      return;
    }

    // Si le groupe est public...
    if (group.groupType === 'Public') {

      // S'il y a déjà 10 membres, on affiche une erreur.
      if (group.members.length >= 10) {
        this.displayService.displayMessage("Ce groupe est déjà complet (10 membres maximum).");
        return;
      }

      // Sinon on rejoint le groupe.
      else {
        
      }

    }

  }
}
