import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProfileService } from '../../service/profile.service';
import { catchError, map, of, tap } from 'rxjs';
import { SharedModule } from '../../../shared/shared.module';
import { ShortenPipe } from '../../../shared/profil/pipe/shorten.pipe';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDeleteAccountComponent } from '../confirm-delete-account/confirm-delete-account.component';
import { DisplayService } from '../../../shared/display/service/display.service';


@Component({
  selector: 'app-profile-homepage',
  imports: [
    SharedModule,
    ShortenPipe
  ],
  templateUrl: './profile-homepage.component.html',
  styleUrl: './profile-homepage.component.scss'
})
export class ProfileHomepageComponent implements OnInit{

  // Variables pour stocker les champs apparaissant dans le profil de l'utilisateur.
  // On ne récupère pas le mot de passe car il est crypté.
  firstName!: string ;
  lastName!: string ;
  username!: string ;
  email!: string;
  imageUrl!: string;


  constructor(private profilService : ProfileService,
              private router : Router,
              private dialog: MatDialog,
              private displayService : DisplayService) {}


  ngOnInit(): void {

    // On récupère les données de profil de l'utilisateur
    this.profilService.getProfile().pipe(
      tap( (rep) => {
        this.firstName = rep['user']['personalInfo']['firstName'],
        this.lastName = rep['user']['personalInfo']['lastName'],
        this.username = rep['user']['loginInfo']['username'],
        this.email = rep['user']['emailInfo']['email'],
        this.imageUrl = rep['user']['image']
      })
    ).subscribe()
  }
  
  // On appelle cette méthode pour modifier le profil de l'utilisateur (hors mot de passe)
  onModifyProfile(): void {
    this.router.navigateByUrl('/profile/modify')
  }

  // On appelle cette méthode pour modifier le mot de passe de l'utilisateur
  onModifyPassword() : void {
    this.router.navigateByUrl('/profile/modifyPassword')
  }

  // On appelle cette méthode pour supprimer le compte de l'utilisateur.
  onDeleteAccount(): void{
    // On lance la fenêtre de confirmation de suppression du compte
    const confirmDeleteAccount = this.dialog.open(ConfirmDeleteAccountComponent);

    // On récupère la réponse sur la fenêtre de confirmation
    confirmDeleteAccount.afterClosed().pipe(
      tap( (confirm) => {

        // Si l'utilisateur a confirmé la suppression
        if (confirm) {

          // On supprime le compte grâce au service
          this.profilService.deleteAccount().subscribe()
        } 
      }),
      catchError ( () => {
        this.displayService.displayMessage("Une erreur est survenue lors de la suppression")
        return of(null)
      })
    ).subscribe()
    
  }
  
}
