import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment.development";
import { catchError, map, Observable, of, tap } from "rxjs";
import { ModifyProfileForm } from "../models/modify-profile.models";
import { RegisterForm } from "../../login/components/register/models/register-form.model";
import { DisplayService } from "../../shared/display/service/display.service";
import { Router } from "@angular/router";
import { TokenService } from "../../interceptors/services/auth.service";

@Injectable()

export class ProfileService {
    constructor( private http: HttpClient,
                 private displayService : DisplayService,
                 private router : Router,
                 private tokenService : TokenService) {}

    // Cette méthode lance la requête pour récupérer les données sur un utilisteur dont l'id est donné en argument.
    getProfile(): Observable<any> {
        return this.http.get(`${environment.apiUrl}/profile`)
    }

    // Cette méthode permet de modifier les données de l'utilisateur à partir du formulaire en argument.
    modifyUserInfo(formValue: ModifyProfileForm): Observable<boolean>{
        return this.http.put(`${environment.apiUrl}/profile/modify`, formValue).pipe(
            map( () => true),
            catchError( () => of(false))
        )
    }

    // Cette méthode permet de modifier le mot de passe de l'utilisateur à partir du formulaire en argument.
    modifyPassword(formValue: RegisterForm): Observable<boolean> {
        return this.http.put(`${environment.apiUrl}/profile/modifyPassword`, formValue).pipe(
            map( () => true),
            catchError( () => of(false))
        )
    }

    // Cette méthode permet de vérifier si l'email est déjà utilisé à partir du formulaire en argument.
    emailTaken(formValue: ModifyProfileForm) : Observable<boolean>{
        return this.http.post(`${environment.apiUrl}/profile/email`, formValue).pipe(
            map( () => false),
            catchError(() => of(true))
            
        ); 
    }

    // Cette méthode permet de vérifier si l'username est déjà utilisé à partir du formulaire en argument.
    usernameTaken(formValue: ModifyProfileForm): Observable<boolean>{
            return this.http.post(`${environment.apiUrl}/profile/username`, formValue).pipe(
                map( () => false),
                catchError(() => of(true))
            );
    }

    // Cette méthode permet de supprimer le compte de l'utilisateur
    deleteAccount(): Observable<boolean> {
        return this.http.delete(`${environment.apiUrl}/profile/deleteAccount`).pipe(
            tap( ()=> {
                    // On supprime le token
                    this.tokenService.removeToken()

                    // On redirige vers la page d'accueil
                    this.router.navigateByUrl('/homepage')

                    // On affiche un message à l'utilisateur
                    this.displayService.displayMessage("Votre compte a été supprimé")
            }),
            // On retourne true en cas de succès et false sinon.
            map( ()=> true),
            catchError( ()=> of(false))
        )
    }
}