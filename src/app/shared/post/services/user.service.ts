import { Injectable } from "@angular/core";
import { ProfileService } from "../../../profile/service/profile.service";
import { map, Observable, tap } from "rxjs";
import { usernameImage } from "../../../private-message/models/username-image.models";
import { Router } from "@angular/router";
import { DisplayService } from "../../display/service/display.service";

@Injectable()

export class UserService{
    constructor(private profileService : ProfileService,
                private displayService : DisplayService,
                private router : Router){}

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