import { Injectable } from "@angular/core";
import { ProfileService } from "../../../profile/service/profile.service";
import { BehaviorSubject, catchError, map, Observable, of, tap } from "rxjs";
import { usernameImage } from "../../../private-message/models/username-image.models";
import { Router } from "@angular/router";
import { DisplayService } from "../../display/service/display.service";

@Injectable()

export class UserService{
    constructor(private profileService : ProfileService,
                private displayService : DisplayService,
                private router : Router){}
    
    // Subject et Observable pour gérer les données du currentUser
    private currentUserSubject = new BehaviorSubject<usernameImage>({id: '', username : '', image: ''});
    currentUser$ = this.currentUserSubject.asObservable();

    // Cette méthode permet d'initialiser les données du currentUser 
    initCurrentUser(): void{
        this.profileService.getProfile().pipe(
            map( (profile : any) => {
                return {
                    id: profile.user._id,
                    username: profile.user.loginInfo.username,
                    image: profile.user.image
                } as usernameImage;
            }),
            catchError( () => {
                this.displayService.displayMessage('Erreur lors de la récupération des données de l\'utilisateur.')
                this.router.navigate(['/login']);
                return of(null)
            })
        ).subscribe(user => {
            if (!user) return;
            this.currentUserSubject.next(user);
        });
    }

    // Cette méthode permet de récupérer l'id du currentUser
    getCurrentUserId(): string  {
        return this.currentUserSubject.getValue().id 
    }

    // Cette méthode permet de récupérer l'username du currentUser
    getCurrentUserUsername(): string {
        return this.currentUserSubject.getValue().username
    }

    // Cette méthode permet de récupérer l'image de profil de l'utilisateur
    getCurrentUserImage(): string {
        return this.currentUserSubject.getValue().image 
    }

    // Subject et Observable pour gérer les données du otherUser
    private otherUserSubject = new BehaviorSubject<usernameImage>({id: '', username : '', image: ''});
    otherUser$ = this.otherUserSubject.asObservable();

    // Cette méthode permet d'initialiser les données de otherUser  à partir des données dans l'historique
    initOtherUser(historyState: any): void{
        if (historyState && historyState.id && historyState.username && historyState.image) {
            this.otherUserSubject.next( 
                {
                    id : history.state.id,
                    username : history.state.username,
                    image: history.state.image
                } as usernameImage
            )
        }
        else {
            this.displayService.displayMessage('Impossible de récupérer les informations de l\'autre utilisateur.');
            this.router.navigateByUrl('/private-message');
            throw new Error('Impossible de récupérer les informations de l\'autre utilisateur.');
        }
    }

    // Cette méthode permet de récupérer l'id du otherUser
    getOtherUserId(): string  {
        return this.otherUserSubject.getValue().id 
    }

    // Cette méthode permet de récupérer l'username du otherUser
    getOtherUserUsername(): string  {
        return this.otherUserSubject.getValue().username
    }

    // Cette méthode permet de récupérer l'image de profil du otherUser
    getOtherUserImage(): string  {
        return this.otherUserSubject.getValue().image
    }
}