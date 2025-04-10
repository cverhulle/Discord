import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function ArrayNotEmpty(): ValidatorFn{
    return (ctrl: AbstractControl): null | ValidationErrors => {
        const array = ctrl.value
        return Array.isArray(array) && array.length > 0 ? null : {arrayEmpty : true}
    }
}