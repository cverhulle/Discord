import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProfileService } from '../../service/profile.service';
import { tap } from 'rxjs';
import { SharedModule } from '../../../shared/shared.module';
import { ShortenPipe } from '../../../shared/profil/pipe/shorten.pipe';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDeleteAccountComponent } from '../confirm-delete-account/confirm-delete-account.component';


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
              private dialog: MatDialog) {}


  ngOnInit(): void {

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
  
  onModifyProfile(): void {
    this.router.navigateByUrl('/profile/modify')
  }

  onModifyPassword() : void {
    this.router.navigateByUrl('/profile/modifyPassword')
  }

  onDeleteAccount(): void{
    const confirmDelteAccount = this.dialog.open(ConfirmDeleteAccountComponent);
  }
  
}
