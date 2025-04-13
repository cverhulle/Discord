import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable()

export class PasswordService{

    // Subject et Observable pour gérer la visibilité d'un mot de passe.
    private hidePasswordSubject = new BehaviorSubject<boolean>(true);
    hidePassword$ = this.hidePasswordSubject.asObservable();
}