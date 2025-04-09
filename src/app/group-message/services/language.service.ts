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

    // Méthode pour savoir si un language est sélectionné
    isSelected(language : string): boolean {
        const selectedLanguages = this.getValueOfSelectedLanguages()
        return selectedLanguages.includes(language)
    }

    // Méthode pour ajouter ou retirer un language
    handleLanguages(language: string): void {
        const selectedLanguages = this.getValueOfSelectedLanguages()

        if(this.isSelected(language)) {
            const updatedLanguages = selectedLanguages.filter(languages => languages !== language)
            this.selectedLanguagesSubject.next(updatedLanguages)
        } else {
            const updatedLanguages = [...selectedLanguages, language]
            this.selectedLanguagesSubject.next(updatedLanguages)
        }

    }
}