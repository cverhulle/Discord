import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function correctEmailValidator(): ValidatorFn {
    return (ctrl: AbstractControl): null | ValidationErrors => {
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
