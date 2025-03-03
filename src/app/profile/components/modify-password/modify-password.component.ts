import { Component, OnInit } from '@angular/core';
import { RegisterModifyFormComponent } from "../../../shared/components/register-modify-form/register-modify-form.component";
import { RegisterForm } from '../../../login/components/register/models/register-form.model';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-modify-password',
  imports: [
    RegisterModifyFormComponent,
    NgIf
  ],
  templateUrl: './modify-password.component.html',
  styleUrl: './modify-password.component.scss'
})
export class ModifyPasswordComponent implements OnInit{

  // Variable pour stocker le formulaire initialisé
  initForm!: RegisterForm ;

  // Variable pour configurer le titre de la page
  titlePage = 'Modifier mon mot de passe' ; 

  // Variable pour désativer les champs de mot de passe
  disablePasswordFields = false;




  ngOnInit(): void {
    this.createInitForm()
    
  }


  private createInitForm() : void {
    // On initialise le formulaire (vide ici)
    this.initForm = {
      personalInfo: {
        firstName: '',
        lastName: ''
      },
      emailInfo: {
        email: '',
        confirmEmail: ''
      },
      loginInfo: {
        username: '',
        password: '',
        confirmPassword: ''
      },
      image: ''
    }
  }

  onModifyPassword(event : any) {

  }


}
