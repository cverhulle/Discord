import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable()

// Ce service permet de gérer la barre de recherches (des utilisateurs et des groupes)
export class SearchQueryService{
    // Subject et observable pour émettre l'entrée de l'utilisateur dans la barre de recherche
    private searchSubject = new BehaviorSubject<string> ('')
    searchSubject$ = this.searchSubject.asObservable()
}