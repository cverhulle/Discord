import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { JoinAGroup } from "../models/join-a-group.model";
import { BehaviorSubject, Observable } from "rxjs";
import { GroupFormInfo } from "../models/group-info.model";
import { environment } from "../../../environments/environment.development";

@Injectable()

// Ce service permet de gérer l'envoi du formulaire pour rejoindre un groupe
export class JoinAGroupService{

    constructor(private http: HttpClient) {}

    // Subject et Observable pour stocker les groups de l'utilisateur
    joinAGroupsSubject = new BehaviorSubject<GroupFormInfo[]>([])
    joinAGroup$ = this.joinAGroupsSubject.asObservable()

    // Cette méthode permet de modifier la valeur de joinAGroupSubject
    setValueOfJoinAGroupSubject(state : GroupFormInfo[]) : void {
        this.joinAGroupsSubject.next(state)
    }

    // Cette méthode permet de récupérer la dernière valeur émise par le subject joinAGroupSubject
    getValueOfJoinAGroupSubject() : GroupFormInfo[] {
        return this.joinAGroupsSubject.getValue()
    }

    // Cette méthode permet de supprimer les critères que l'utilisateur n'a pas filtrés
    handleSearchCriterias(criteria : JoinAGroup) : JoinAGroup {
        if (!criteria.groupName) delete criteria.groupName
        if(criteria.groupType === 'Tout') delete criteria.groupType
        if(criteria.groupLanguages?.length === 0) delete criteria.groupLanguages
        if( criteria.groupCategories?.length === 0) delete criteria.groupCategories
        return criteria
    }

    // Cette méthode permet d'envoyer au backend les critères de recherche
    // Elle retourne les groupes correspondant à la recherche
    joinGroups(criteria : JoinAGroup) : void {
        this.http.post<GroupFormInfo>(`${environment.apiUrl}/group-message/join-a-group`, criteria)
    }
}