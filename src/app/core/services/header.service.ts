import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { NavigationLink } from "../models/navigation-links.model";

@Injectable()

// Service lié au header.
export class HeaderService{

    navLinks: NavigationLink[] = [
        { label: 'Accueil', route: '/homepage', action: 'navigate' },
        { label: 'Connexion', route: '/login', action: 'navigate' },
        { label: 'Mon profil', route: '/profile', action: 'navigate' },
        { label: 'Messages privés', route: '/private-message', action: 'navigate' },
        { label: 'Groupes de discussion', route: '/group-message', action: 'navigate' },
        { label: 'Déconnexion', action: 'logout' }
    ];


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