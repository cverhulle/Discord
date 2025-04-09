import { Injectable } from "@angular/core";
import { ChipService } from "./chip.service";
import { FormGroup } from "@angular/forms";
import { ImageService } from "../../shared/image/services/image.services";

@Injectable()

export class FormCreateGroupMessageService {
    constructor(private chipService : ChipService,
                private imageService : ImageService) {}

    // Cette méthode permet de créer le formData à envoyer au backend en prenant le formGroup en argument.
    createFormDataToSend(registerForm: FormGroup): void{
        const selectedCategories = this.chipService.getValueOfSelectedCategories()
        const formData = {
          ...registerForm.value,
          categories : selectedCategories
        }
        console.log(formData)
    }
}