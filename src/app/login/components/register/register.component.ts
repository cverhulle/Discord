import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule} from '@angular/forms';
import { SharedModule } from '../../../shared/shared.module';
import { RegisterFormService } from './services/register-form.service';
import { RegisterModifyFormComponent } from "../../../shared/components/register-modify-form/register-modify-form.component"; 
import { RegisterForm } from './models/register-form.model';
import { NgIf } from '@angular/common';
import { Observable, tap } from 'rxjs';
import { RegisterModifyService } from '../../../shared/services/register-modify.service';


@Component({
  selector: 'app-register',
  imports: [
    SharedModule,
    ReactiveFormsModule,
    NgIf,
    RegisterModifyFormComponent
],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})

export class RegisterComponent implements OnInit{

  // Variable pour stocker le formulaire initialisé
  initForm!: RegisterForm ;

  // Variable pour configurer le titre de la page
  titlePage = 'Créer mon compte discord' ; 

  // Variable pour désativer les champs de mot de passe
  disablePasswordFields = false;

  constructor(private registerFormService : RegisterFormService,
              private registerModifyService : RegisterModifyService
  ) {}



  ngOnInit() {
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


  private sendForm(event: RegisterForm): Observable<boolean> {
    // Retourne un Observable permettant d'envoyer le formulaire.
    return this.registerFormService.saveUserInfo(event).pipe(
      tap(saved => {
        // this.loading = false;
        if (saved) {
          // this.registerForm.reset();
          console.log("Utilisateur crée");
        } else {
          console.log("Erreur lors de l\'enregistrement de l\'utilisateur");
        }
      })
    )
  }


  onCreateUser(event: RegisterForm) {
    this.sendForm(event).subscribe()
    
  }



}
  



  

