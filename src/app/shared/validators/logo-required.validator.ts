import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

// Ce Validator permet de vérifier que le logo est bien présent lors de la création d'un groupe.
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