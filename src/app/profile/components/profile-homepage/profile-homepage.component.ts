import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProfileService } from '../../service/profile.service';
import { tap } from 'rxjs';


@Component({
  selector: 'app-profile-homepage',
  imports: [],
  templateUrl: './profile-homepage.component.html',
  styleUrl: './profile-homepage.component.scss'
})
export class ProfileHomepageComponent implements OnInit{
// Variable pour l'id de l'utilisateur.
userId!: string

// Variables pour stocker les champs apparaissant dans le profil de l'utilisateur.
// On ne récupère pas le mot de passe car il est crypté.
firstName!: string ;
lastName!: string ;
username!: string ;
email!: string;
imageUrl!: string;


  constructor(private route: ActivatedRoute,
              private profilService : ProfileService) {}


  ngOnInit(): void {

    this.userId = this.route.snapshot.params['id']

    this.profilService.getProfile(this.userId).pipe(
      tap( (rep) => {
        this.firstName = rep['user']['personalInfo']['firstName'],
        this.lastName = rep['user']['personalInfo']['lastName'],
        this.username = rep['user']['loginInfo']['username'],
        this.email = rep['user']['emailInfo']['email'],
        this.imageUrl = rep['user']['image']
      })
    ).subscribe()
  }  

  
}
