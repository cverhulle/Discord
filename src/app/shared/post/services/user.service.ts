import { Injectable } from "@angular/core";
import { ProfileService } from "../../../profile/service/profile.service";
import { BehaviorSubject, map, Observable, tap } from "rxjs";
import { usernameImage } from "../../../private-message/models/username-image.models";
import { Router } from "@angular/router";
import { DisplayService } from "../../display/service/display.service";

@Injectable()

export class UserService{
    constructor(private profileService : ProfileService,
                private displayService : DisplayService,
                private router : Router){}
    
    // Subject et Observable pour gérer les données du currentUser
    private currentUserSubject = new BehaviorSubject<usernameImage | null>(null);
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
            })
        ).subscribe(user => {
            this.currentUserSubject.next(user);
        });
    }

    // Cette méthode permet de récupérer l'id du currentUser
    getCurrentUserId(): string | null {
        return this.currentUserSubject.getValue()?.id ?? null
    }


    // Cette méthode permet de récupérer les données de l'utilisateur actuel.
    getCurrentUser(): Observable<usernameImage>{
        const currentUser = new usernameImage();
    
        return this.profileService.getProfile().pipe(
            map((profile: any) => {
                currentUser['id']= profile.user._id,
                currentUser['username']=profile.user.loginInfo.username,
                currentUser['image']=profile.user.image
                return currentUser
            })
        )
    }

    // Cette méthode permet de récupérer les données de l'utilisateur avec lequel on communique.
    getOtherUser(historyState: any): usernameImage{
        if (historyState && historyState.id && historyState.username && historyState.image) {
            const otherUser = new usernameImage();
            otherUser.id = historyState.id;
            otherUser.username = historyState.username;
            otherUser.image = historyState.image;
            return otherUser;
        } else {
            this.displayService.displayMessage('Impossible de récupérer les informations de l\'autre utilisateur.');
            this.router.navigateByUrl('/private-message');
            throw new Error('Impossible de récupérer les informations de l\'autre utilisateur.');
        }
    }
}