import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function strongPasswordValidator(): ValidatorFn {
    return (ctrl: AbstractControl): ValidationErrors | null => {

        // On vérifie que le ctrl possède bien une value
        if(!ctrl.value){
            return {weakPassword : 'Invalid controller'}
        }

        const value = ctrl.value || '';

        // Expression régulière : au moins une minuscule, une majuscule, un chiffre et un caractère spécial.
        const strongPasswordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    
        return strongPasswordPattern.test(value)? null : { weakPassword: true };
    };
  }