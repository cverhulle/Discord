import { Injectable } from "@angular/core";
import { catchError, map, Observable, of } from "rxjs";
import { environment } from "../../../../../environments/environment.development";
import { HttpClient } from "@angular/common/http";

@Injectable()

export class RegisterFormService {
  constructor(private http: HttpClient) {}

    saveUserInfo(formValue: RegisterFormService): Observable<boolean> {
        return this.http.post(`${environment.apiUrl}/users`, formValue).pipe(
            map( () => true),
            catchError(() => of(false))
        );
    }
}
