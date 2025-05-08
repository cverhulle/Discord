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

    // Cette méthode permet de récupérer le token de connexion dans le localStorage
    getToken() : string | null {
        return localStorage.getItem('token')
    }

    // Cette méthode permet de vérifier si le token de connexion à expirer ou non
    private isTokenExpired(token: string): boolean {
        try {
            // On récupère la partie du token qui nous intéresse dans token.split(...)
            // Le atob(...) permet de décoder la chaine
            // On parse l'objet obtenu avec JSON.parse
            const payload = JSON.parse(atob(token.split('.')[1]));

            // On récupère la date d'expiration du token
            const exp = payload.exp;

            // On récupère la date actuelle en secondes
            const now = Math.floor(Date.now() / 1000);

            // On retourne true si le token a expiré et false sinon
            return exp < now;
        } catch (e) {
            // En cas d'erreur, on retourne true
            return true; 
        }
    }

    // Cette méthode permet de supprimer un token
    removeToken(): void {
        localStorage.removeItem('token')
        this.router.navigateByUrl('/homepage')
    }

    // Cette méthode permet de savoir si un utilisateur est connecté
    isLogged(): boolean {
        const token = this.getToken()
        return !!token
    }




    
}