import { Injectable } from "@angular/core";
import { FormGroup } from "@angular/forms";


@Injectable()

export class FormCreateGroupMessageService {
    constructor() {}

    // Cette méthode permet de créer le formData à envoyer au backend en prenant le formGroup en argument.
    createFormDataToSend(registerForm: FormGroup): void{
     
      // On construit le formData
      const formData = {
        ...registerForm.value,
      }
      console.log(formData)
  }
}