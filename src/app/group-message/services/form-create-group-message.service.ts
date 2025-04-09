import { Injectable } from "@angular/core";
import { ChipService } from "./chip.service";
import { FormGroup } from "@angular/forms";
import { ImageService } from "../../shared/image/services/image.services";
import { LanguageService } from "./language.service";

@Injectable()

export class FormCreateGroupMessageService {
    constructor(private chipService : ChipService,
                private imageService : ImageService,
                private languageService: LanguageService) {}

    // Cette méthode permet de créer le formData à envoyer au backend en prenant le formGroup en argument.
    createFormDataToSend(registerForm: FormGroup): void{
      // On récupère les catégories
      const selectedCategories = this.chipService.getValueOfSelectedCategories()

      // On récupère les languages
      const selectedLanguages = this.languageService.getValueOfSelectedLanguages()

      // On récupère le logo
      const logoToSend = this.imageService.getValueOfImageToSend()
      
      // On construit le formData
      const formData = {
        ...registerForm.value,
        categories : selectedCategories,
        languages : selectedLanguages,
        logo: logoToSend
      }
      console.log(formData)
  }
}