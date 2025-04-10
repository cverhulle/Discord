import { Injectable } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { ImageService } from "../../shared/image/services/image.services";


@Injectable()

export class FormCreateGroupMessageService {
    constructor(private imageService : ImageService) {}

    // Cette méthode permet de créer le formData à envoyer au backend en prenant le formGroup en argument.
    createFormDataToSend(registerForm: FormGroup): void{
      // On récupère le logo
      const logoToSend = this.imageService.getValueOfImageToSend()
      
      // On construit le formData
      const formData = {
        ...registerForm.value,
        logo: logoToSend
      }
      console.log(formData)
  }
}