import { Injectable } from "@angular/core";
import { usernameImage } from "../../../private-message/models/username-image.models";

@Injectable( {
    providedIn: 'root'
})

export class AvatarService{
    // Variable pour stocker l'URL des images de profil par défaut.
    private defaultUrl: string = 'https://static.vecteezy.com/ti/vecteur-libre/p1/4274186-person-icon-user-interface-icon-silhouette-of-man-simple-symbol-a-glyph-symbol-in-your-web-site-design-logo-app-ui-webinar-video-chat-ect-vectoriel.jpg'

    getProfileImage(user: usernameImage, imageErrors: { [key: string] : boolean }) : string {
        return imageErrors[user.username] ? this.defaultUrl : user.image
    }
}