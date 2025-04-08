import { Injectable } from "@angular/core";
import { ChipService } from "./chip.service";
import { FormGroup } from "@angular/forms";

@Injectable()

export class FormCreateGroupMessage {
    constructor(private chipService : ChipService) {}

    createFormDataToSend(registerForm: FormGroup): void{
        const selectedCategories = this.chipService.getValueOfSelectedCategories()
        const formData = {
          ...registerForm.value,
          categories : selectedCategories
        }
        console.log(formData)
    }
}