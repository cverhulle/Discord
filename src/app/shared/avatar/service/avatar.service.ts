import { Injectable } from "@angular/core";
import { usernameImage } from "../../../private-message/models/username-image.models";
import { BehaviorSubject } from "rxjs";

@Injectable( {
    providedIn: 'root'
})

export class AvatarService{
    // Dictionnaire pour stocker les erreurs de chargement d'image
    private imageErrorsSubject = new BehaviorSubject<{ [key: string]: boolean}>({});
    imageErrors$ = this.imageErrorsSubject.asObservable();

    // Variable pour stocker l'URL des images de profil par défaut.
    private defaultUrl: string = 'https://static.vecteezy.com/ti/vecteur-libre/p1/4274186-person-icon-user-interface-icon-silhouette-of-man-simple-symbol-a-glyph-symbol-in-your-web-site-design-logo-app-ui-webinar-video-chat-ect-vectoriel.jpg'


    updateImageError(username: string, hasError: boolean): void {
        const currentErrors = this.imageErrorsSubject.value;
        currentErrors[username] = hasError;
        this.imageErrorsSubject.next(currentErrors)
    }


    getProfileImage(user: usernameImage) : string {
        const currentErrors = this.imageErrorsSubject.value;
        return currentErrors[user.username] ? this.defaultUrl : user.image;
    }
}