import { Component, OnInit } from '@angular/core';
import { NgFor, NgStyle } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../../../shared/shared.module';


import { ChipService } from '../../services/chip.service';
import { LanguageService } from '../../services/language.service';
import { DisplayService } from '../../../shared/display/service/display.service';
import { JoinAGroupService } from '../../services/join-a-group.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-join-a-group',
  imports: [
    SharedModule,
    NgFor,
    ReactiveFormsModule,
    NgStyle
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
  joinAGroupForm!: FormGroup;
  groupName!: FormControl;
  groupType!: FormControl;
  groupLanguages!: FormControl;
  groupCategories!: FormControl;

  constructor(private chipService : ChipService,
              private languageService : LanguageService,
              private displayService : DisplayService,
              private formBuilder : FormBuilder,
              private joinAGroupService : JoinAGroupService,
              private router :Router) {}

  ngOnInit(): void {
      this.initChipsCategoriesAndAvailableLanguages()
      this.resetSubjects()
      this.initFormControls()
      this.initRegisterForm()
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

  // Méthode pour initialiser le formulaire complet
  initRegisterForm(): void{
    this.joinAGroupForm = this.formBuilder.group({
      groupName: this.groupName,
      groupType: this.groupType,
      groupLanguages : this.groupLanguages,
      groupCategories : this.groupCategories,
    })
  };

  // Méthode pour selectionner ou désectionner une catégorie.
  onHandleCategories(category: string): void {
    this.chipService.handleCategories(category);
    this.updateCategoriesFormControl();
  }

  // Méthode pour mettre à jour le formControl lié aux catégories
  private updateCategoriesFormControl(): void{
    const selectedCatégories = this.chipService.getValueOfSelectedCategories();
    this.groupCategories.setValue(selectedCatégories);
  }

  // Méthode pour savoir si une catégorie est déjà selectionnée.
  isCategorySelected(category: string): boolean {
    return this.chipService.isSelected(category)
  }

  // Méthode pour selectionner ou déselectionner un language.
  onHandleLanguages(language: string): void {
    this.languageService.handleLanguages(language);
    this.updateLanguagesFormControl();
  }

  // Méthode pour mettre à jour le formControl lié aux languages
  private updateLanguagesFormControl(): void{
    const selectedLanguages = this.languageService.getValueOfSelectedLanguages();
    this.groupLanguages.setValue(selectedLanguages);
  }

  // Méthode pour savoir si une langue est sélectionnée.
  isLanguageSelected(language: string): boolean {
    return this.languageService.isSelected(language);
  }

  // Méthode pour réinitialiser le formulaire
  private resetForm(): void{
    this.joinAGroupForm.reset()
    this.resetSubjects()
  }
  

  // Méthode pour envoyer le formulaire
  onSubmit(): void{
    this.displayService.displayMessage("En cours d'implémentation...")

    // On supprime les filtres non utilisés
    const criterias = this.joinAGroupService.handleSearchCriterias(this.joinAGroupForm.value)

    // On envoie la requete au service qui met à jour la liste des groupes répondant aux critères
    this.joinAGroupService.joinGroups(criterias).subscribe( (success : boolean) => {

      // En cas d'échec...
      if (!success) { 

        // On affiche un message d'erreur
        this.displayService.displayMessage("Erreur lors de l'envoi au serveur");

        // En cas de succès...
      } else {

        // On redirige vers le component d'affichage
        this.router.navigateByUrl('/group-message/join-a-group-display')
      }
    })
  }

}
