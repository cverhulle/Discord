import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { TokenService } from "../interceptors/services/auth.service";

@Injectable({
    providedIn : 'root'
})

// Ce guard permet de bloquer l'accès à un onglet de l'application si l'utilisateur n'est pas connecté. Il est alors redirigé vers la page de login.
export class AuthGuard implements CanActivate{

    constructor(private tokenService : TokenService,
                private router : Router
            )   {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        const token = this.tokenService.getToken();
        if (token) {
            return true
        } else {
            this.router.navigateByUrl('/login');
            return false
        }
    }
}

