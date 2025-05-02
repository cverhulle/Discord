import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { usernameImage } from "../models/username-image.models";
import { environment } from "../../../environments/environment.development";

@Injectable()

// Service du module private-message
export class PrivateMessageService {
    constructor(private http: HttpClient) {}

    // Subject et Observable pour récupérer la liste des utilisateurs sur la page d'accueil
    usersSubject = new BehaviorSubject<usernameImage[]>([])
    users$ = this.usersSubject.asObservable()

    // Subject et observable pour émettre l'entrée de l'utilisateur dans la barre de recherche
    private searchSubject = new BehaviorSubject<string> ('')
    searchSubject$ = this.searchSubject.asObservable()

    
    updateSearchQuery(query: string): void{
        this.searchSubject.next(query)
    }
    
    // Cette méthode permet de retourner la liste des utilisateurs correspondant à la recherche en argument
    searchQueryUsers(query: string) : Observable<usernameImage[]> {
        return this.http.get<usernameImage[]>(`${environment.apiUrl}/private-message/queryUsers?search=${query}`)
    }
}