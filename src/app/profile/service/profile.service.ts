import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment.development";
import { Observable } from "rxjs";

@Injectable()

export class ProfileService {
    constructor( private http: HttpClient) {}

    getProfile(userId: string): Observable<any> {
        return this.http.get(`${environment.apiUrl})\profile\${userId}`)
    }
}