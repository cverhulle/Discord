import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable( {
    providedIn: 'root'
})

// Ce service permet de gérer l'affichage des images de profil en petit avatar.
export class AvatarService{
    // Dictionnaire pour stocker les erreurs de chargement d'image
    private imageErrorsSubject = new BehaviorSubject<{ [key: string]: boolean}>({});
    imageErrors$ = this.imageErrorsSubject.asObservable();

    // Variable pour stocker l'URL des images de profil par défaut.
    private defaultUrl: string = 'https://static.vecteezy.com/ti/vecteur-libre/p1/4274186-person-icon-user-interface-icon-silhouette-of-man-simple-symbol-a-glyph-symbol-in-your-web-site-design-logo-app-ui-webinar-video-chat-ect-vectoriel.jpg'

    // Cette méthode permet de faire émettre au Subject le dictionnaire.
    updateImageError(username: string, hasError: boolean): void {
        const currentErrors = this.imageErrorsSubject.value;
        currentErrors[username] = hasError;
        this.imageErrorsSubject.next(currentErrors)
    }

    // Cette méthode permet de retourner l'image par défaut s'il y a une erreur dans l'image de profil de l'utilisateur.
    getProfileImage(userImage: string, username: string) : string {
        const currentErrors = this.imageErrorsSubject.value;
        return currentErrors[username] ? this.defaultUrl : userImage;
    }
}