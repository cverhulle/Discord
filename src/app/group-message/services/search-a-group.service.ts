import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, map, Observable, of } from "rxjs";
import { GroupFormInfo } from "../models/group-info.model";
import { environment } from "../../../environments/environment.development";

@Injectable() 

// Ce service permet de récupérer les groupes de l'utilisateur
export class SearchAGroupService{
    constructor(private http: HttpClient) {}

    // Cette méthode permet de récupérer tous les groupes dans lesquels l'utilisateur est un membre.
    getUsersGroups(): Observable<boolean> {
        return this.http.get<GroupFormInfo>(`${environment.apiUrl}/group-message/my-group`).pipe(
            map( () => true),
            catchError( () => of(false) )
        )
    }
}