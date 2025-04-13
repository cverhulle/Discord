import { Injectable } from "@angular/core";
import { AbstractControl, FormControl, Validators } from "@angular/forms";
import { BehaviorSubject } from "rxjs";
import { strongPasswordValidator } from "../../validators/strong-password.validator";

@Injectable()

export class PasswordService{

    // Subject et Observable pour gérer la visibilité d'un mot de passe.
    private hidePasswordSubject = new BehaviorSubject<boolean>(true);
    hidePassword$ = this.hidePasswordSubject.asObservable();

    // Méthode pour récupérer la dernière valeur émise par le subject hidePassword.
    getValueOfHidePasswordSubject(): boolean {
        return this.hidePasswordSubject.getValue()
    }

    // Méthode pour modifier l'état du mot de passe (visible ou caché)
    togglePasswordVisibility(): void{
        const state = this.hidePasswordSubject.value;
        this.hidePasswordSubject.next(!state);
    }

    // Méthode pour gérer les validators sur les champs de mot de passe en fonction du type de groupe
    managePasswordValidators(groupTypeControl : AbstractControl, passwordControl : FormControl): void{
        groupTypeControl.valueChanges.subscribe((type: string) => {
        
              // Si le champ passe à restreint
              if (type === 'Restreint') {
        
                // On place les validators sur le champ de mot de passe
                passwordControl.setValidators([
                  Validators.required,
                  strongPasswordValidator()
                ]);
    
            } else {
                // Sinon, on retire les validators et on reset le contenu du champ
                passwordControl.clearValidators();
                passwordControl.setValue('');
                passwordControl.markAsUntouched(); 

            // On met à jour le controlleur
            passwordControl.updateValueAndValidity();
            }
        
        });
    }
}