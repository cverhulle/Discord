import { Component } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-create-group',
  imports: [
    SharedModule,
    NgFor
  ],
  templateUrl: './create-group.component.html',
  styleUrl: './create-group.component.scss'
})
export class CreateGroupComponent {
  // Variable pour stocker les catégories possibles
  categories = ['Animé', 'Art', 'Cuisine', 'Éducation',
    'Films et Séries', 'Jeux vidéos', 'Langues Étrangères',
    'Manga', 'Musique', 'Photographie', 'Programmation',
    'Sport', 'Travail', 'Voyage'
  ];

}
 