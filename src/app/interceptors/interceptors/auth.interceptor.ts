import { HttpEvent, HttpHandlerFn, HttpHeaders, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable } from 'rxjs';
import { TokenService } from '../services/auth.service';



export function AuthInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {

    // On injecte le service
    const tokenService = inject(TokenService);

    // On récupère le token
    const token = tokenService.getToken()

    // Si on n'a pas de token, la requête est renvoyée telle quelle.
    if(!token) {
        return next(req)
    }

    // Si un token est trouvé
    // On ajoute le token dans le header Authorization de toutes les requetes.
    const modifiedReq = req.clone({
        setHeaders : {
            Authorization : `Bearer ${token}`
        }
    })
    
    return next(modifiedReq)    

}
