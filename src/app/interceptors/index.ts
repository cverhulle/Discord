import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { AuthInterceptor } from "./interceptors/auth.interceptor";

// On crée un fichier index pour préparer l'enregistrement de tous les intercepteurs.


export const httpInterceptorProviders = [

    // HTTP_INTERCEPTORS dit qu'il s'agit d'un intercepteur.
    // multi signale que plusieurs intercepteurs vont certainement être ajoutés à la clé HTTP_INTERCEPTORS.
    { provide : HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
]