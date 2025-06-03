import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
    providedIn : 'root'
})

export class RegisterModifyService{

    // Variable pour le loading
    private loadingSuject = new BehaviorSubject<boolean>(false)
    loading$ = this.loadingSuject.asObservable()

    // Variable pour l'erreur d'email
    private errorEmailSuject = new BehaviorSubject<boolean>(false)
    errorEmail$ = this.errorEmailSuject.asObservable()

    // Variable pour l'erreur d'username
    private errorUsernameSuject = new BehaviorSubject<boolean>(false)
    errorUsername$ = this.errorUsernameSuject.asObservable()

    // Cette méthode permet de modifier la valeur du subject de loading
    setLoading(loading: boolean) {
        this.loadingSuject.next(loading)
    }

    // Cette méthode permet de modifier la valeur du subject de l'erreur d'email
    setErrorEmail(errorEmail: boolean) {
        this.errorEmailSuject.next(errorEmail)
    }

    // Cette méthode permet de modifier la valeur du subject de l'erreur d'username
    setErrorUsername(errorUsername: boolean) {
        this.errorUsernameSuject.next(errorUsername)
    }


    


}
