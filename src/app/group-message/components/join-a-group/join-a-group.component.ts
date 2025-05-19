import { Component, OnInit } from '@angular/core';
import { NgFor } from '@angular/common';

import { SharedModule } from '../../../shared/shared.module';


import { ChipService } from '../../services/chip.service';
import { LanguageService } from '../../services/language.service';
import { DisplayService } from '../../../shared/display/service/display.service';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-join-a-group',
  imports: [
    SharedModule,
    NgFor,
    ReactiveFormsModule
  ],
  templateUrl: './join-a-group.component.html',
  styleUrl: './join-a-group.component.scss'
})
export class JoinAGroupComponent implements OnInit{

  // Variable pour stocker les catégories possibles.
  chipsCategories !: string[]

  // Variable pour stocker les languages disponibles.
  availableLanguages!: string[]

  // Variables liées au formulaire
  registerForm!: FormGroup;
  groupName!: FormControl;
  groupType!: FormControl;
  groupLanguages!: FormControl;
  groupCategories!: FormControl;

  constructor(private chipService : ChipService,
              private languageService : LanguageService,
              private displayService : DisplayService,
              private formBuilder : FormBuilder) {}

  ngOnInit(): void {
      this.initChipsCategoriesAndAvailableLanguages()
      this.resetSubjects()
      this.initFormControls()
  }

  // Méthode pour initialiser les catégories disponibles et le subject lié.
  private initChipsCategoriesAndAvailableLanguages(): void{
    this.chipsCategories = this.chipService.chipsCategories
    this.availableLanguages = this.languageService.availableLanguages
  }

  // Méthode pour réinitialiser les subjects dans le service
  private resetSubjects(): void{
    this.chipService.resetSelectedCategoriesSubject()
    this.languageService.resetSelectedLanguagesSubject()
  }

  // Méthode pour initialiser tous les FormControl
  initFormControls(): void{

    // Initialisation du nom du groupe.
    this.groupName = this.formBuilder.control('')

    // Initialisation du type de groupe.
    this.groupType = this.formBuilder.control('Tout');

    // Initialisation du language
    this.groupLanguages = this.formBuilder.control([]);

    // Initialisation des catégories
    this.groupCategories = this.formBuilder.control([]);
  }

  // Méthode pour envoyer le formulaire
  onSubmit(): void{
    this.displayService.displayMessage("En cours d'implémentation...")
  }

}
