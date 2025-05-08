import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, catchError, map, Observable, of, tap } from "rxjs";
import { GroupFormInfo } from "../models/group-info.model";
import { environment } from "../../../environments/environment.development";
import { DisplayService } from "../../shared/display/service/display.service";

@Injectable() 

// Ce service permet de récupérer les groupes de l'utilisateur
export class SearchAGroupService{
    constructor(private http: HttpClient,
                private displayService : DisplayService) {}

    // Subject et Observable pour stocker les groups de l'utilisateur
    currentUserGroupsSubject = new BehaviorSubject<GroupFormInfo[]>([])
    currentUserGroup$ = this.currentUserGroupsSubject.asObservable()

    // Méthode permettant de modifier la valeur du subject currentUserGroupSubject
    setValueOfCurrentUserGroupSubject(groupList : GroupFormInfo[]) {
        this.currentUserGroupsSubject.next(groupList)
    }

    // Méthode permettant de récupérer la dernière émission de currentUserGroupSubject
    getValueOfCurrentUserGroupSubject() : GroupFormInfo[] {
        return this.currentUserGroupsSubject.getValue()
    }

    // Cette méthode permet de récupérer tous les groupes dans lesquels l'utilisateur est un membre.
    getUsersGroups(): Observable<boolean> {
        return this.http.get<GroupFormInfo[]>(`${environment.apiUrl}/group-message/my-group`).pipe(
            tap( groupList => {
                this.setValueOfCurrentUserGroupSubject(groupList)
            }),
            map( () => true),
            catchError( () => {
                this.displayService.displayMessage('Erreur lors de la recherche des groupes.');
                this.setValueOfCurrentUserGroupSubject([])
                return of(false)
            })
        )
    }
}