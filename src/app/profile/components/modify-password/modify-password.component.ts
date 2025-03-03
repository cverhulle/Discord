import { Component, OnInit } from '@angular/core';
import { RegisterModifyFormComponent } from "../../../shared/components/register-modify-form/register-modify-form.component";
import { Observable } from 'rxjs';
import { RegisterModifyService } from '../../../shared/services/register-modify.service';


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



  constructor(private registerModifyService : RegisterModifyService) {}


  
  ngOnInit(): void {
    this.initLoading()
  }

  private initLoading() {
    // Récupère dans le service l'observable loading
    this.loading$ = this.registerModifyService.loading$
  }



  onModifyPassword(event : any) {

  }


}
