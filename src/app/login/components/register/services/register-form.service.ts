import { Injectable } from "@angular/core";
import { catchError, map, Observable, of} from "rxjs";
import { environment } from "../../../../../environments/environment.development";
import { HttpClient } from "@angular/common/http";
import { RegisterForm } from "../models/register-form.model";

@Injectable()

// Service du component register
export class RegisterFormService {
    constructor(private http: HttpClient) {}

    // Cette méthode permet de vérifier si l'email est déjà utilisé.
    emailExists(formValue: RegisterForm): Observable<boolean>{
        return this.http.post(`${environment.apiUrl}/users/register/email`, formValue).pipe(
            map( () => false),
            catchError(() => of(true))
        );
    }

    // Cette méthode permet de vérifier si l'username est déjà utilisé.
    usernameExists(formValue: RegisterForm): Observable<boolean>{
        return this.http.post(`${environment.apiUrl}/users/register/username`, formValue).pipe(
            map( () => false),
            catchError(() => of(true))
        );
    }

    // Cette méthode permet d'envoyer le formulaire au back-end. On retourne True en cas de succès et False sinon.
    saveUserInfo(formValue: RegisterForm): Observable<boolean> {
        return this.http.post(`${environment.apiUrl}/users/register`, formValue).pipe(
            map( () => true),
            catchError(() => of(false))
        );
    }

    


}

