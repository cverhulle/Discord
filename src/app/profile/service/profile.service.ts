import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment.development";
import { Observable } from "rxjs";

@Injectable()

export class ProfileService {
    constructor( private http: HttpClient) {}

    // Cette méthode lance la requête pour récupérer les données sur un utilisteur donc l'id est donné en argument.
    getProfile(): Observable<any> {
        return this.http.get(`${environment.apiUrl}/profile`)
    }
}