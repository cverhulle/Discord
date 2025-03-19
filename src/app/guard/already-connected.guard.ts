import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { TokenService } from "../interceptors/services/auth.service";

@Injectable({
    providedIn : 'root'
})

// Ce guard permet de bloquer l'accès à l'onglet de connexion et de rediriger vers le profil si l'utilisateur est déjà connecté.
export class AlreadyConnectedGuard implements CanActivate{

    constructor(private tokenService : TokenService,
                private router : Router
            )   {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

        // On récupère le token grâce au service.
        const token = this.tokenService.getToken();
        if (token) {
            // On redirige vers la page de profil.
            this.router.navigateByUrl('/profile');
            return false
        } else {
            return true
        }
    }
}

