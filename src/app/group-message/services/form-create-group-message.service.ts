import { Injectable } from "@angular/core";
import { GroupForm } from "../models/group-form.model";
import { FormGroup } from "@angular/forms";


@Injectable()

export class FormCreateGroupMessageService {
    constructor() {}

    // Cette méthode permet de créer le formData à envoyer au backend en prenant le formGroup en argument.
    createFormDataToSend(registerForm: FormGroup): FormData{
     
      const formValues = registerForm.value as GroupForm

      const formData = new FormData();
    
      formData.append('groupName', formValues.groupName);
      formData.append('groupDescription', formValues.groupDescription);
      formData.append('groupType', formValues.groupType);
    
      formValues.groupLanguages.forEach((lang: string) => {
        formData.append('groupLanguages', lang);
      });
    
      formValues.groupCategories.forEach((cat: string) => {
        formData.append('groupCategories', cat);
      });
    
      if (formValues.groupLogo) {
        formData.append('groupLogo', formValues.groupLogo);
      }
    
      return formData;
    }
}
