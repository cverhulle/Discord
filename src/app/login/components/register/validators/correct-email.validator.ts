import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function correctEmailValidator(): ValidatorFn {
    return (ctrl: AbstractControl): null | ValidationErrors => {
        let regExp = new RegExp("^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$");
        if (regExp.test(ctrl.value)) {
            return null;
        } else {
            return {
                correctEmail: ctrl.value
            }
        }
    }
}
