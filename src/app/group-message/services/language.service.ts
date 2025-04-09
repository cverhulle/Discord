import { Injectable } from "@angular/core";

@Injectable()

export class LanguageService{
    // Cette variable permet de stocker les languages disponibles pour la création d'un groupe.
    availableLanguages = ['Allemand', 'Anglais', 'Espagnol', 'Français']
}