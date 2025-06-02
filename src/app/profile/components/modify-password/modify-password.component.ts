import { Component, OnInit } from '@angular/core';
import { RegisterModifyFormComponent } from '../../../shared/register-modify/components/register-modify-form/register-modify-form.component';
import { Observable, tap } from 'rxjs';
import { RegisterModifyService } from '../../../shared/register-modify/services/register-modify.service';
import { RegisterForm } from '../../../login/components/register/models/register-form.model';
import { Router } from '@angular/router';
import { ProfileService } from '../../service/profile.service';
import { DisplayService } from '../../../shared/display/service/display.service';

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
              private profileService : ProfileService,
              private router : Router,
              private displayService : DisplayService) {}

  ngOnInit(): void {
    this.initLoading()
  }

  // Cette méthode permet d'initialiser le loading$
  private initLoading() {
    this.loading$ = this.registerModifyService.loading$
  }

  // Cette méthode est utilisée pour envoyer le nouveau mot de passe au back-end.
  private sendForm(event: RegisterForm) {
    return this.profileService.modifyPassword(event).pipe(      
      tap( saved => {
        this.registerModifyService.setLoading(false)
        if (saved) {
          this.displayService.displayMessage('Mot de passe modifié.')
          this.router.navigateByUrl('/profile')
        } else {
          this.displayService.displayMessage("Erreur lors de l'enregistrement du mot de passe.")
        }
      }
    )
    ).subscribe()
  }

  // Méthode à déclencher lors de l'appui sur le bouton "Modifier".
  onModifyPassword(event : RegisterForm) {
    this.sendForm(event)
  }
}
