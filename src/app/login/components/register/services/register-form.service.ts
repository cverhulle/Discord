import { Injectable } from "@angular/core";
import { catchError, map, Observable, of } from "rxjs";
import { environment } from "../../../../../environments/environment.development";
import { HttpClient } from "@angular/common/http";
import { RegisterForm } from "../models/register-form.model";

@Injectable()

export class RegisterFormService {
    constructor(private http: HttpClient) {}

    saveUserInfo(formValue: RegisterForm): Observable<boolean> {
        return this.http.post(`${environment.apiUrl}/users`, formValue).pipe(
            map( () => true),
            catchError(() => of(false))
        );
    }
}
