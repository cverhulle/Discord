import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function strongPasswordValidator(): ValidatorFn {
    return (ctrl: AbstractControl): ValidationErrors | null => {
      const value = ctrl.value || '';
      const strongPasswordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
  
      return strongPasswordPattern.test(value)? null : { weakPassword: true };
    };
  }