import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable()

// Service lié au header (barre de navigation)
export class HeaderService{

    // Ce subject permet de controler l'ouverture du menu à l'appui sur le menu burger
    openMenuSubject = new BehaviorSubject<boolean>(false)
    openMenu$ = this.openMenuSubject.asObservable()

    // Méthode permettant de gérer l'émission du Subject openMenu
    setValueOfOpenMenuSubject(state : boolean) {
        this.openMenuSubject.next(state)
    }

    // Méthode permettant de récupérer la dernière émission du subject openMenu
    getValueOfOpenMenuSubject() {
        return this.openMenuSubject.getValue()
    }

    // Méthode permettant d'émettre l'inverse de la dernière émission du subject openMenu
    reverseOpenMenuSubject() {
        const currentState = this.getValueOfOpenMenuSubject()
        this.openMenuSubject.next(!currentState)
    }
}