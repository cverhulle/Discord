import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from "@angular/router";
import { TokenService } from "../interceptors/services/auth.service";

@Injectable({
    providedIn : 'root'
})

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

