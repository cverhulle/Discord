import { Injectable } from "@angular/core";

@Injectable()

export class ChipService{
    // Cette variable stocke les catégories possibles pour les groupes.
    chipsCategories = [
        'Animé', 'Art', 'Cuisine', 'Éducation','Films et Séries', 
        'Jeux vidéos', 'Langues Étrangères', 'Manga', 'Musique', 
        'Photographie', 'Programmation', 'Sport', 'Travail', 
        'Voyage'
      ];
}
