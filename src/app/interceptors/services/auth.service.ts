import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

@Injectable({
    providedIn: 'root'
})

export class TokenService {
    constructor(private router: Router) {}

    saveToken(token: string): void {
        localStorage.setItem('token', token)
    }

    // saveUserId(id: string): void {
    //    localStorage.setItem('userId', id)
    // }

    getToken() : string | null {
        return localStorage.getItem('token')
    }

    // getUserId(): string | null {
    //    return localStorage.getItem('userId')
    // }

    isLogged(): boolean {
        const token = this.getToken()
        return !!token

    }

    removeToken(): void {
        localStorage.removeItem('token')
        this.router.navigateByUrl('/homepage')
    }

    
}