import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { LoginForm } from "../models/login-form.model";
import { catchError, map, Observable, of } from "rxjs";
import { environment } from "../../../../../environments/environment.development";

@Injectable()

export class LoginFormService {
    constructor(private http: HttpClient) {}

    loginUser(formValue: LoginForm): Observable<any> {
        return this.http.post(`${environment.apiUrl}/users/login`, formValue)
    }

    
}
