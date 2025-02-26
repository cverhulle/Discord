import { Injectable } from "@angular/core";
import { catchError, map, Observable, of, tap } from "rxjs";
import { environment } from "../../../../../environments/environment.development";
import { HttpClient } from "@angular/common/http";
import { RegisterForm } from "../models/register-form.model";


@Injectable()

export class RegisterFormService {
    constructor(private http: HttpClient) {}

    emailExists(formValue: RegisterForm): Observable<boolean>{
        return this.http.post(`${environment.apiUrl}/users/register/email`, formValue).pipe(
            map( () => false),
            catchError(() => of(true))
            
        );
    }

    usernameExists(formValue: RegisterForm): Observable<boolean>{
        return this.http.post(`${environment.apiUrl}/users/register/username`, formValue).pipe(
            map( () => false),
            catchError(() => of(true))
        );
    }

    saveUserInfo(formValue: RegisterForm): Observable<boolean> {
        return this.http.post(`${environment.apiUrl}/users/register`, formValue).pipe(
            map( () => true),
            catchError(() => of(false))
        );
    }

    modifyUserInfo(formValue: RegisterForm): Observable<boolean>{
        return this.http.put(`${environment.apiUrl}/profile/modify`, formValue).pipe(
            map( () => true),
            catchError( () => of(false))
        )
    }


}

