import { Component, OnInit } from '@angular/core';
import { RegisterModifyFormComponent } from "../../../shared/components/register-modify-form/register-modify-form.component";


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




  ngOnInit(): void {
        
  }




  onModifyPassword(event : any) {

  }


}
