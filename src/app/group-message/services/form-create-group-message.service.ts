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
        const selectedCategories = this.chipService.getValueOfSelectedCategories()
        const logoToSend = this.imageService.getValueOfImageToSend()
        
        const formData = {
          ...registerForm.value,
          categories : selectedCategories,
          logo: logoToSend
        }
        console.log(formData)
    }
}