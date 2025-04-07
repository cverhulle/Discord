import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable()

export class ChipService{
    // Cette variable stocke les catégories possibles pour les groupes.
    chipsCategories = [
        'Animé', 'Art', 'Cuisine', 'Éducation','Films et Séries', 
        'Jeux vidéos', 'Langues Étrangères', 'Manga', 'Musique', 
        'Photographie', 'Programmation', 'Sport', 'Travail', 
        'Voyage'
    ];

    //Subject pour stocker les catégories sélectionnées
    private selectedCategoriesSubject = new BehaviorSubject<string[]>([])
    selectedCategories$ = this.selectedCategoriesSubject.asObservable()

    // Méthode pour obtenir la valeur du subject
    getValueOfSelectedCategories(): string[] {
        return this.selectedCategoriesSubject.getValue()
    }
}
