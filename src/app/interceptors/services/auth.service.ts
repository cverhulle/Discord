import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

@Injectable({
    providedIn: 'root'
})

// Ce service permet de gérer le token de connexion
export class TokenService {
    constructor(private router: Router) {}

    // Cette méthode permet de sauvegarder le token sur le localStorage du navigateur
    saveToken(token: string): void {
        localStorage.setItem('token', token)
    }

    getToken() : string | null {
        return localStorage.getItem('token')
    }

    // getUserId(): string | null {
    //    return localStorage.getItem('userId')
    // }

    // Cette méthode permet de savoir si un utilisateur est connecté
    isLogged(): boolean {
        const token = this.getToken()
        return !!token
    }

    // Cette méthode permet de supprimer un token
    removeToken(): void {
        localStorage.removeItem('token')
        this.router.navigateByUrl('/homepage')
    }

    
}