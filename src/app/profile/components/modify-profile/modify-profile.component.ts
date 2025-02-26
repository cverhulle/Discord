import { Component, OnInit } from '@angular/core';

import { ProfileService } from '../../service/profile.service';
import { tap } from 'rxjs';
import { RegisterModifyFormComponent } from '../../../shared/components/register-modify-form/register-modify-form.component';
import { RegisterForm } from '../../../login/components/register/models/register-form.model';
import { NgIf } from '@angular/common';
import { RegisterFormService } from '../../../login/components/register/services/register-form.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-modify-profile',
  imports: [
    RegisterModifyFormComponent,
    NgIf
  ],
  templateUrl: './modify-profile.component.html',
  styleUrl: './modify-profile.component.scss'
})
export class ModifyProfileComponent implements OnInit{

  // On récupère les données de l'utilisateur.
  // On ne récupère pas le mot de passe car il est crypté.
  firstName!: string ;
  lastName!: string ;
  username!: string ;
  email!: string;
  imageUrl!: string;

  // Variable pour stocker le formulaire initialisé
  initForm!: RegisterForm

  // Variable pour configurer le titre de la page
  titlePage = 'Modifier mon compte discord'


  constructor( private profileService: ProfileService,
               private registerFormService : RegisterFormService,
               private router: Router ) {}


  ngOnInit(): void {
    this.profileService.getProfile().pipe(
      tap( (rep) => {

        // On sauvegarde les données de l'utilisateur
        this.firstName = rep['user']['personalInfo']['firstName'],
        this.lastName = rep['user']['personalInfo']['lastName'],
        this.username = rep['user']['loginInfo']['username'],
        this.email = rep['user']['emailInfo']['email'],
        this.imageUrl = rep['user']['image']
      })
    ).subscribe(
      (rep) => {

        // On configure initForm qui contient les données de l'utilisateur dans le format du modèle de données.
        this.initForm= {
          personalInfo: {
            firstName: this.firstName,
            lastName: this.lastName
          },
          emailInfo: {
            email: this.email,
            confirmEmail: this.email
          },
          loginInfo: {
            username: this.username,
            password: '',
            confirmPassword: ''
          },
          image: this.imageUrl
        }
      }

    )
  }
  
  modifyProfile(event: RegisterForm) {
    this.registerFormService.modifyUserInfo(event).subscribe()
    this.router.navigateByUrl('/profile')
  }
}

