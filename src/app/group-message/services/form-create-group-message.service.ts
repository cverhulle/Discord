import { Injectable } from "@angular/core";
import { ChipService } from "./chip.service";
import { FormGroup } from "@angular/forms";

@Injectable()

export class FormCreateGroupMessage {
    constructor(private chipService : ChipService) {}

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