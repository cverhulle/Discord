import { Component, OnInit } from '@angular/core';
import { RegisterModifyFormComponent } from "../../../shared/components/register-modify-form/register-modify-form.component";
import { Observable, tap } from 'rxjs';
import { RegisterModifyService } from '../../../shared/services/register-modify.service';
import { RegisterForm } from '../../../login/components/register/models/register-form.model';
import { Router } from '@angular/router';


@Component({
  selector: 'app-modify-password',
  imports: [
    RegisterModifyFormComponent,
],
  templateUrl: './modify-password.component.html',
  styleUrl: './modify-password.component.scss'
})
export class ModifyPasswordComponent implements OnInit{

  // Variable pour configurer le titre de la page
  titlePage = 'Modifier mon mot de passe' ; 

  // Variable pour désativer les champs de mot de passe
  disableFieldsExceptPasswords = true;

  //Variable pour le chargement
  loading$!: Observable<boolean>



  constructor(private registerModifyService : RegisterModifyService,
              private router : Router) {}



  ngOnInit(): void {
    this.initLoading()
  }

  private initLoading() {
    // Récupère dans le service l'observable loading
    this.loading$ = this.registerModifyService.loading$
  }


  private sendForm(event: RegisterForm) {

    return this.registerModifyService.modifyPassword.pipe(      
      tap( saved => {
        this.registerModifyService.setLoading(false)
        if (saved) {
          console.log('Mot de passe modifié')
          this.router.navigateByUrl('/profile')
        } else {
          console.log('Echec lors de l\'enregistrement')
        }
        
        
      }
    )
    ).subscribe()

  }


  onModifyPassword(event : RegisterForm) {
    this.sendForm(event)
  }


}
