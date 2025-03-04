import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../service/profile.service';
import { forkJoin, Observable, tap } from 'rxjs';
import { NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { ModifyProfileForm } from '../../models/modify-profile.models';
import { RegisterModifyService } from '../../../shared/register-modify/services/register-modify.service';
import { RegisterModifyFormComponent } from '../../../shared/register-modify/components/register-modify-form/register-modify-form.component';



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
  initForm!: ModifyProfileForm

  // Variable pour configurer le titre de la page
  titlePage = 'Modifier mon compte discord'

  // Variable pour désativer les champs de mot de passe
  disablePasswordFields = true;

  //Variable pour le chargement
  loading$!: Observable<boolean>




  constructor( private profileService: ProfileService,
               private router: Router,
               private registerModifyService : RegisterModifyService) {}




  ngOnInit(): void {
    this.initLoadingAndErrorsObservables()
    this.getProfileInfos().subscribe(
      (rep) => {

        this.createInitForm()
      }

    )
  }


  private initLoadingAndErrorsObservables() : void {
    // Récupère dans le service l'observable loading
    this.loading$ = this.registerModifyService.loading$
  }


  private getProfileInfos() : Observable<any> {

    // On récupère les données du profil de l'utilisateur.

    return this.profileService.getProfile().pipe(
      tap( (rep) => {

        // On sauvegarde les données de l'utilisateur
        this.firstName = rep['user']['personalInfo']['firstName'],
        this.lastName = rep['user']['personalInfo']['lastName'],
        this.username = rep['user']['loginInfo']['username'],
        this.email = rep['user']['emailInfo']['email'],
        this.imageUrl = rep['user']['image']
      })
    )
  }



  private createInitForm() : void {
    // On configure initForm qui contient les données de l'utilisateur dans le format du modèle de données.
    this.initForm = {
      personalInfo: {
        firstName: this.firstName,
        lastName: this.lastName
      },
      emailInfo: {
        email: this.email,
        confirmEmail: this.email
      },
      loginInfo: {
        username: this.username
      },
      image: this.imageUrl
    }
  }



  private emailAlreadyTaken(event: ModifyProfileForm): Observable<boolean> {
    // Retourne un Observable permettant de vérifier si l'adresse email dans le formulaire envoyée existe déjà dans la BDD (en dehors de l'utilisateur actuel).
    // Si oui, on arrête le chargement et, on passe errorFormEmail à true.
    return this.profileService.emailTaken(event).pipe(
      tap(exist => {
        if (exist) {
          this.registerModifyService.setLoading(false)
          this.registerModifyService.setErrorEmail(true)
          console.log("L'email est déjà utilisé")
        }
      })
    )
  }


  private usernameAlreadyTaken(event: ModifyProfileForm): Observable<boolean> {
    // Retourne un Observable permettant de vérifier si l'username dans le formulaire envoyée existe déjà dans la BDD (en dehors de l'utilisateur actuel)..
    // Si oui, on arrête le chargement et, on passe errorFormUsername à true.
    return this.profileService.usernameTaken(event).pipe(
      tap(exist => {
        if (exist) {
          this.registerModifyService.setLoading(false)
          this.registerModifyService.setErrorUsername(true)
          console.log("L'username est déjà utilisé")
        }
      })
    )
  }


  private sendForm(event: ModifyProfileForm): Observable<boolean> {
    return this.profileService.modifyUserInfo(event).pipe(
      tap( (modif) => {
        this.registerModifyService.setLoading(false)
        if (modif) {
          console.log('Modification(s) enregistrée(s)')
          this.router.navigateByUrl('/profile')
        } else {
          console.log('Echec lors de la modification')
        }
      })
    )
    
  }
  
  
  modifyProfile(event: ModifyProfileForm) {
    forkJoin([
          // On regarde si l'email est déjà dans la base de données.
          this.emailAlreadyTaken(event),
    
          // On regarde si l'username est déjà dans la base de données.
          this.usernameAlreadyTaken(event)
        ]).subscribe(
          ([emailTaken,usernameTaken]) => {
    
            // On regarde si l'erreur d'username ou l'erreur d'email a lieu.
            if (!emailTaken && !usernameTaken) {
            
              // Si les deux erreurs sont fausses, on lance l'envoi du formulaire.
              this.sendForm(event).subscribe()
            }
          }
    
        )
  }
}

