import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable()

// Service lié au header (barre de navigation)
export class HeaderService{

    // Ce subject permet de controler l'ouverture du menu à l'appui sur le menu burger
    openMenuSubject = new BehaviorSubject<boolean>(false)
    openMenu$ = this.openMenuSubject.asObservable()
}