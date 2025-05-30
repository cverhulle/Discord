import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule} from '@angular/forms';
import { SharedModule } from '../../../shared/shared.module';
import { RegisterFormService } from './services/register-form.service';
import { RegisterModifyFormComponent } from '../../../shared/register-modify/components/register-modify-form/register-modify-form.component';
import { RegisterForm } from './models/register-form.model';
import { forkJoin, Observable, tap } from 'rxjs';
import { RegisterModifyService } from '../../../shared/register-modify/services/register-modify.service';
import { Router } from '@angular/router';
import { DisplayService } from '../../../shared/display/service/display.service';


@Component({
  selector: 'app-register',
  imports: [
    SharedModule,
    ReactiveFormsModule,
    RegisterModifyFormComponent
],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})

export class RegisterComponent implements OnInit{

  // Variable pour configurer le titre de la page
  titlePage = 'Créer mon compte discord' ; 

  //Variable pour le chargement
  loading$!: Observable<boolean>

  constructor(private registerFormService : RegisterFormService,
              private registerModifyService : RegisterModifyService,
              private router : Router,
              private displayService : DisplayService) {}

  ngOnInit() {
    this.initLoadingAndErrorsObservables()
        
  }

  private initLoadingAndErrorsObservables(): void{
    // Récupère dans le service l'observable loading
    this.loading$ = this.registerModifyService.loading$
  
  }

  private emailAlreadyExists(event: RegisterForm): Observable<boolean> {
    // Retourne un Observable permettant de vérifier si l'adresse email dans le formulaire envoyée existe déjà dans la BDD.
    // Si oui, on arrête le chargement et, on passe errorFormEmail à true.
    return this.registerFormService.emailExists(event).pipe(
      tap(exist => {
        if (exist) {
          this.registerModifyService.setLoading(false)
          this.registerModifyService.setErrorEmail(true)
          this.displayService.displayMessage('Cet email est déjà utilisé.')
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
          this.displayService.displayMessage('Cet username est déjà utilisé.')
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
          this.displayService.displayMessage('Utilisateur crée.')
          this.router.navigateByUrl('/homepage')
        } else {
          this.displayService.displayMessage("Erreur dans l'enregistrement de l'utilisateur.");
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
  



  

