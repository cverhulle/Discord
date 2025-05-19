import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { NgFor, NgIf } from '@angular/common';
import { ChipService } from '../../services/chip.service';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-join-a-group',
  imports: [
    SharedModule,
    NgIf,
    NgFor
  ],
  templateUrl: './join-a-group.component.html',
  styleUrl: './join-a-group.component.scss'
})
export class JoinAGroupComponent implements OnInit{

  // Variable pour stocker les catégories possibles.
  chipsCategories !: string[]

  // Variable pour stocker les languages disponibles.
  availableLanguages!: string[]

  constructor(private chipService : ChipService,
              private languageService : LanguageService) {}

  ngOnInit(): void {
    
  }

}
