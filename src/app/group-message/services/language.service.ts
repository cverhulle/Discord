import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable()

export class LanguageService{
    // Cette variable permet de stocker les languages disponibles pour la création d'un groupe.
    availableLanguages = ['Allemand', 'Anglais', 'Espagnol', 'Français'];

    // Subject et Observable pour stocker les languages sélectionnés
    private selectedLanguagesSubject = new BehaviorSubject<string[]>([])
    selectedLanguages$ = this.selectedLanguagesSubject.asObservable()

    // Méthode pour récupérer la dernière émission de selectedLanguagesSubject
    getValueOfSelectedLanguages(): string[] {
        return this.selectedLanguagesSubject.getValue()
    }
}