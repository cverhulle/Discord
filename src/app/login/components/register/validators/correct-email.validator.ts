import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

// Ce Validator permet de vérifier qu'un champ est bien de type "email" (d'après l'expression régulière proposée).
export function correctEmailValidator(): ValidatorFn {
    return (ctrl: AbstractControl): null | ValidationErrors => {
        // Cette expression régulière est celle attendue pour l'email.
        let regExp = new RegExp("^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+[.]{1}[a-zA-Z]{2,3}$");
        if (regExp.test(ctrl.value)) {
            return null;
        } else {
            return {
                correctEmail: ctrl.value
            }
        }
    }
}
