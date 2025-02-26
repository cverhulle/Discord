import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment.development";
import { catchError, map, Observable, of } from "rxjs";
import { RegisterForm } from "../../login/components/register/models/register-form.model";

@Injectable()

export class ProfileService {
    constructor( private http: HttpClient) {}

    // Cette méthode lance la requête pour récupérer les données sur un utilisteur donc l'id est donné en argument.
    getProfile(): Observable<any> {
        return this.http.get(`${environment.apiUrl}/profile`)
    }

    modifyUserInfo(formValue: RegisterForm): Observable<boolean>{
        return this.http.put(`${environment.apiUrl}/profile/modify`, formValue).pipe(
            map( () => true),
            catchError( () => of(false))
        )
    }
}