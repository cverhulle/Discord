import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function LogoRequiredValidator() : ValidatorFn{
    return (ctrl: AbstractControl) : ValidationErrors | null => {

        // On vérifie que le ctrl possède bien une value
        if (!ctrl.value) {
            return {
                logoRequired : 'true'
            };
        } else {
            return null
        }


    }
}