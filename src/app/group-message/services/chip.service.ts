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

    // Méthode pour savoir si une catégorie est déjà sélectionnée 
    isSelected(category: string): boolean{
        const selectedCategories = this.getValueOfSelectedCategories()
        return selectedCategories.includes(category)
    }

    // Méthode pour ajouter ou retirer une catégorie
    handleCategories(category: string): void {
        const selectedCategories = this.getValueOfSelectedCategories()

        if(this.isSelected(category)) {
            const updatedCategories = selectedCategories.filter(categories => categories !== category)
            this.selectedCategoriesSubject.next(updatedCategories)
        } else {
            const updatedCategories = [...selectedCategories, category]
            this.selectedCategoriesSubject.next(updatedCategories)
        }

    }

    // Méthode pour réinitialiser selectedCategoriesSubject
    resetSelectedCategoriesSubject(): void{
        this.selectedCategoriesSubject.next([])
    }
}
