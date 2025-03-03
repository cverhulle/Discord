import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule} from '@angular/forms';
import { SharedModule } from '../../../shared/shared.module';
import { RegisterFormService } from './services/register-form.service';
import { RegisterModifyFormComponent } from "../../../shared/components/register-modify-form/register-modify-form.component"; 
import { RegisterForm } from './models/register-form.model';
import { NgIf } from '@angular/common';
import { forkJoin, Observable, tap } from 'rxjs';
import { RegisterModifyService } from '../../../shared/services/register-modify.service';
import { Router } from '@angular/router';


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

  //Variable pour le chargement
  loading$!: Observable<boolean>



  constructor(private registerFormService : RegisterFormService,
              private registerModifyService : RegisterModifyService,
              private router : Router) {}



  ngOnInit() {
    this.initLoadingAndErrorsObservables()
    this.createInitForm()
    
  }


  private initLoadingAndErrorsObservables(): void{
    // Récupère dans le service l'observable loading
    this.loading$ = this.registerModifyService.loading$
  
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



  private emailAlreadyExists(event: RegisterForm): Observable<boolean> {
    // Retourne un Observable permettant de vérifier si l'adresse email dans le formulaire envoyée existe déjà dans la BDD.
    // Si oui, on arrête le chargement et, on passe errorFormEmail à true.
    return this.registerFormService.emailExists(event).pipe(
      tap(exist => {
        if (exist) {
          this.registerModifyService.setLoading(false)
          this.registerModifyService.setErrorEmail(true)
          console.log("L'email est déjà utilisé")
        }
      })
    )
  }


  private usernameAlreadyExists(event: RegisterForm): Observable<boolean> {
    // Retourne un Observable permettant de vérifier si l'username dans le formulaire envoyée existe déjà dans la BDD.
    // Si oui, on arrête le chargement et, on passe errorFormUsername à true.
    return this.registerFormService.usernameExists(event).pipe(
      tap(exist => {
        if (exist) {
          this.registerModifyService.setLoading(false)
          this.registerModifyService.setErrorUsername(true)
          console.log("L'username est déjà utilisé")
        }
      })
    )
  }




  private sendForm(event: RegisterForm): Observable<boolean> {
    // Retourne un Observable permettant d'envoyer le formulaire.
    return this.registerFormService.saveUserInfo(event).pipe(
      tap(saved => {
        this.registerModifyService.setLoading(false)
        if (saved) {
          console.log("Utilisateur crée");
          this.router.navigateByUrl('/homepage')
        } else {
          console.log("Erreur lors de l\'enregistrement de l\'utilisateur");
        }
      })
    )
  }


  onCreateUser(event: RegisterForm) {

    forkJoin([
      // On regarde si l'email est déjà dans la base de données.
      this.emailAlreadyExists(event),

      // On regarde si l'username est déjà dans la base de données.
      this.usernameAlreadyExists(event)
    ]).subscribe(
      ([emailExists,usernameExists]) => {

        // On regarde si l'erreur d'username ou l'erreur d'email a lieu.
        if (!emailExists && !usernameExists) {
        
          // Si les deux erreurs sont fausses, on lance l'envoi du formulaire.
          this.sendForm(event).subscribe()
        }
      }

    )
    
  }



}
  



  

