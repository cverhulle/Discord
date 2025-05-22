import { Component, OnInit } from '@angular/core';
import { JoinAGroupService } from '../../services/join-a-group.service';
import { Observable } from 'rxjs';
import { GroupFormInfo } from '../../models/group-info.model';
import { SharedModule } from '../../../shared/shared.module';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';

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

  constructor(  private joinAGroupService : JoinAGroupService) {}

  ngOnInit(): void {
    this.initObservables()
  }

  // Cette méthode permet d'initialiser l'Observable "stockant" les groupes répondant à la requete.
  private initObservables(): void{
    this.groups$ = this.joinAGroupService.joinAGroup$
  }
}
