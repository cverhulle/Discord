import { Injectable } from "@angular/core";
import { CreateGroupForm } from "../models/group-form.model";
import { FormGroup } from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import { catchError, map, Observable, of } from "rxjs";
import { environment } from "../../../environments/environment.development";


@Injectable()

export class FormCreateGroupMessageService {
    constructor(private http: HttpClient) {}

    // Cette méthode permet de créer le formData à envoyer au backend en prenant le formGroup en argument.
    createFormDataToSend(registerForm: FormGroup): FormData{
      
      // On récupère les données du formulaire
      const formValues = registerForm.value as CreateGroupForm

      // On initialise le formData
      const formData = new FormData();
      
      // On ajoute les champs de texte
      formData.append('groupName', formValues.groupName);
      formData.append('groupDescription', formValues.groupDescription);
      formData.append('groupType', formValues.groupType);
      
      // Pour les languages et les catégories, on s'adapte au fait que ce sont des arrays
      formValues.groupLanguages.forEach((lang: string) => {
        formData.append('groupLanguages', lang);
      });
    
      formValues.groupCategories.forEach((cat: string) => {
        formData.append('groupCategories', cat);
      });
      
      // S'il y a un logo, on l'ajoute également
      if (formValues.groupLogo) {
        formData.append('groupLogo', formValues.groupLogo);
      }
    
      return formData;
    }

    // Cette méthode permet d'envoyer le formulaire au backend
    sendForm(registerForm : FormGroup): Observable<boolean>{
      const formData = this.createFormDataToSend(registerForm)
      return this.http.post(`${environment.apiUrl}/group-message/create-group`, formData).pipe(
        map( () => true),
        catchError( () => of(false))
      )
    }
}
