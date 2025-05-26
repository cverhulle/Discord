import { Component, OnInit } from '@angular/core';
import { JoinAGroupService } from '../../services/join-a-group.service';
import { Observable } from 'rxjs';
import { GroupFormInfo } from '../../models/group-info.model';
import { SharedModule } from '../../../shared/shared.module';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { DisplayService } from '../../../shared/display/service/display.service';
import { Router } from '@angular/router';
import { PasswordDialogComponent } from '../password-dialog/password-dialog.component';
import { MatDialog } from '@angular/material/dialog';

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
                private displayService : DisplayService,
                private router : Router,
                private dialog : MatDialog) {}

  ngOnInit(): void {
    this.initObservables()
  }

  // Cette méthode permet d'initialiser l'Observable "stockant" les groupes répondant à la requete.
  private initObservables(): void{
    this.groups$ = this.joinAGroupService.joinAGroup$
  }

  // Cette méthode est à appeler pour rejoindre un groupe Privé
  private joinPrivateGroup() : void {
    this.joinAGroupService.joinPrivateGroup()
  }

  // Cette méthode est à appeler lorsque le groupe contient déjà 10 membres
  private join10MembersGroup(): void{
    this.joinAGroupService.Join10MembersGroup()
  }

  // Cette est à appeler pour rejoindre un groupe Public
  private joinPublicGroup(groupId: string) : void{

      // On affiche un message et on redirige vers la page d'accueil des groupes de discussion.     
      this.joinAGroupService.addUserToAGroup(groupId).subscribe( success => {
        if (success) {
          this.displayService.displayMessage("Vous avez rejoint le groupe");
          this.router.navigateByUrl('/group-message')
        }
      })
  }

  // Cette méthode est à appeler pour rejoindre un groupe Restreint
  private joinRestrictedGroup(group : GroupFormInfo) : void {

    // On ouvre la boite de dialogue pour faire apparaitre le champ pour entrer le mot de passe
    const dialogRef = this.dialog.open(PasswordDialogComponent, { data: { groupName: group.groupName } } );

    // Après fermeture...
    dialogRef.afterClosed().subscribe(password => {

      // Si un mot de passe est entré...
      if (password) {

        // On ajoute l'utilisateur au groupe
        this.joinAGroupService.addUserToAGroup(group._id, password).subscribe( success => {
          
          // Si le mot de passe est correct...
          if (success) {          

            // On affiche un message et, on redirige vers l'accueil de group-message
            this.displayService.displayMessage("Vous avez rejoint le groupe");
            this.router.navigateByUrl('/group-message')

            // Sinon, on affiche un message d'erreur
          } else {
            this.displayService.displayMessage("Mot de passe incorrect");
          }
        })
      }  
    });

  }
  

  // Cette méthode se déclenche à l'appui sur le bouton "rejoindre un groupe"
  onJoinGroup(group : GroupFormInfo): void {

    // Si le groupe est privé, on affiche un message d'erreur
    if (group.groupType === 'Privé') {
      this.joinPrivateGroup()
      return;
    }

    // S'il y a déjà 10 membres, on affiche une erreur.
    if (group.members.length >= 10) {
      this.join10MembersGroup()
      return;
    }

    // Si le groupe est public...
    if (group.groupType === 'Public') {
      this.joinPublicGroup(group._id)
    }

    // Si le groupe est Restreint...
    if (group.groupType === 'Restreint') {
      this.joinRestrictedGroup(group)
    }
  }


}
