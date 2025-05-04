import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, catchError, Observable, of, Subject, tap } from "rxjs";
import { usernameImage } from "../models/username-image.models";
import { environment } from "../../../environments/environment.development";
import { AvatarService } from "../../shared/avatar/service/avatar.service";
import { DisplayService } from "../../shared/display/service/display.service";

@Injectable()

// Service du module private-message
export class PrivateMessageService {
    constructor(private http: HttpClient,
                private avatarService : AvatarService,
                private displayService : DisplayService) {}

    // Subject et Observable pour récupérer la liste des utilisateurs sur la page d'accueil
    usersSubject = new BehaviorSubject<usernameImage[]>([]);
    users$ = this.usersSubject.asObservable();

    // Subject et observable pour émettre l'entrée de l'utilisateur dans la barre de recherche
    private searchSubject = new Subject<string>();
    searchSubject$ = this.searchSubject.asObservable();

    // Cette méthode permet de mettre à jour la dernière entrée de l'utilisateur dans la barre de recherche.
    updateSearchQuery(query: string): void{
        this.searchSubject.next(query)
    }

    // Cette méthode permet de mettre à jour le subject des utilisateurs
    setValueOfUsersSubject(state: usernameImage[]): void{
        this.usersSubject.next(state)
    }
    
    // Cette méthode permet de retourner la liste des utilisateurs correspondant à la recherche en argument
    searchQueryUsers(query: string) : Observable<usernameImage[]> {
        return this.http.get<usernameImage[]>(`${environment.apiUrl}/private-message/queryUsers?search=${query}`).pipe(
            catchError(() => {
                this.displayService.displayMessage('Erreur lors de la recherche des utilisateurs.');
                this.setValueOfUsersSubject([])
                return of([]);
            }),
            tap(users => {
                users.forEach(user => this.avatarService.updateImageError(user.username, false));
                this.setValueOfUsersSubject(users)
            })
        )
    }
}