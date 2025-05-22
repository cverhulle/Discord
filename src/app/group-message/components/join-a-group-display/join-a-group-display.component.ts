import { Component } from '@angular/core';
import { JoinAGroupService } from '../../services/join-a-group.service';
import { Observable } from 'rxjs';
import { GroupFormInfo } from '../../models/group-info.model';

@Component({
  selector: 'app-join-a-group-display',
  imports: [],
  templateUrl: './join-a-group-display.component.html',
  styleUrl: './join-a-group-display.component.scss'
})
export class JoinAGroupDisplayComponent {

  // Observable pour récupérer la liste des groupes correspondant à la recherche
  groupsList!: Observable<GroupFormInfo[]>

  constructor(  private joinAGroupService : JoinAGroupService) {}

}
