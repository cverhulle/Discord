import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { SearchAGroup } from "../models/search-ag-group.model";

@Injectable()

// Ce service permet de gérer l'envoi du formulaire pour rejoindre un groupe
export class JoinAGroupService{

    constructor(private hhtp: HttpClient) {}

    // Cette méthode permet de supprimer les critères que l'utilisateur n'a pas filtrés
    handleSearchCriterias(criteria : SearchAGroup) : SearchAGroup {
        if (!criteria.groupName) delete criteria.groupName
        if(criteria.groupType === 'Tout') delete criteria.groupType
        if(criteria.groupLanguages?.length === 0) delete criteria.groupLanguages
        if( criteria.groupCategories?.length === 0) delete criteria.groupCategories
        return criteria
    }
}