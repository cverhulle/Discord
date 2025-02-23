import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TokenService } from './services/auth.service';

@Injectable()

export class AuthInterceptor implements HttpInterceptor {

    constructor(private tokenService: TokenService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        // On ajoute le token dans le header Authorization de toutes les requetes.
        const headers = new HttpHeaders()
            .append('Authorization', `Bearer ${this.tokenService.getToken()}` );
        const modifiedReq = req.clone({headers});
        return next.handle(modifiedReq);    
    }
}