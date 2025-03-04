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


    setLoading(loading: boolean) {
        this.loadingSuject.next(loading)
    }

    setErrorEmail(errorEmail: boolean) {
        this.errorEmailSuject.next(errorEmail)
    }

    setErrorUsername(errorUsername: boolean) {
        this.errorUsernameSuject.next(errorUsername)
    }


    


}
