import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { JoinAGroup } from "../models/join-a-group.model";
import { BehaviorSubject, catchError, map, Observable, of, tap } from "rxjs";
import { GroupFormInfo } from "../models/group-info.model";
import { environment } from "../../../environments/environment.development";
import { DisplayService } from "../../shared/display/service/display.service";

@Injectable()

// Ce service permet de gérer l'envoi du formulaire pour rejoindre un groupe
export class JoinAGroupService{

    constructor(private http: HttpClient,
                private displayService : DisplayService) {}

    // Subject et Observable pour gérer les chargements
    loadingSubject = new BehaviorSubject<boolean>(false);
    loading$ = this.loadingSubject.asObservable();

    // Cette méthode permet de modifier la valeur de loadingSubject
    setValueOfLoadingSubject(state : boolean) : void {
        this.loadingSubject.next(state)
    }

    // Cette méthode permet de récupérer la valeur du loadingSubject
    getValueOfLoadingSubject(): boolean {
        return this.loadingSubject.getValue()
    }

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
    joinGroups(criteria : JoinAGroup) : Observable<boolean> {
        this.setValueOfLoadingSubject(true)
        return this.http.post<GroupFormInfo[]>(`${environment.apiUrl}/group-message/join-a-group`, criteria).pipe(
            tap( groupList => {
                this.setValueOfLoadingSubject(false),
                this.setValueOfJoinAGroupSubject(groupList)
            }),
            map( () => true),
            catchError( () => {
                this.setValueOfLoadingSubject(false)
                this.displayService.displayMessage('Erreur lors de la recherche des groupes.');
                this.setValueOfJoinAGroupSubject([])
                return of(false)
            })
        )
    }

    // Cette méthode permet d'ajouter l'utilisateur dans le groupe d'id groupId
    addUserToAGroup(groupId : string, password? : string) : Observable<boolean> {

        // On crée une variable data qui contient l'id du groupe.
        const data: any = { groupId };

        // On y ajoute le mot de passe s'il y en a un.
        if (password) {
            data.password = password;
        }

        return this.http.post(`${environment.apiUrl}/group-message/add-user`, data ).pipe(
            map( () => true),
            catchError( () => {
                this.displayService.displayMessage("Erreur lors de l'ajout de l'utilisateur");
                return of(false)
            })
        )
    }
}