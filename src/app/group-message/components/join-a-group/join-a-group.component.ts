import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { NgFor, NgIf } from '@angular/common';
import { ChipService } from '../../services/chip.service';
import { LanguageService } from '../../services/language.service';
import { DisplayService } from '../../../shared/display/service/display.service';

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
              private languageService : LanguageService,
              private displayService : DisplayService) {}

  ngOnInit(): void {
      this.initChipsCategoriesAndAvailableLanguages()
      this.resetSubjects()
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

  // Méthode pour envoyer le formulaire
  onSubmit(): void{
    this.displayService.displayMessage("En cours d'implémentation...")
  }

}
