import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function ArrayNotEmpty(): ValidatorFn{
    return (ctrl: AbstractControl): null | ValidationErrors => {

        // On vérifie que le ctrl possède bien une value
        if (!ctrl.value) {
            return {
                arrayEmpty : 'Invalid control'
            };
        }

        // On récupère la value du ctrl
        const array = ctrl.value

        // On vérifie que la valeur obtenue est bien une liste et qu'elle possède au moins un élément
        return Array.isArray(array) && array.length > 0 ? null : {arrayEmpty : true}
    }
}