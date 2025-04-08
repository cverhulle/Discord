import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { NgClass, NgFor, NgStyle } from '@angular/common';
import { ChipService } from '../../services/chip.service';
import { Form, FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-group',
  imports: [
    SharedModule,
    NgFor,
    NgStyle,
    ReactiveFormsModule
  ],
  templateUrl: './create-group.component.html',
  styleUrl: './create-group.component.scss'
})
export class CreateGroupComponent implements OnInit{

  // Variable pour stocker les catégories possibles
  chipsCategories !: string[]

  // Variables liées au formulaire
  registerForm!: FormGroup;
  groupName!: FormControl;
  groupDescription!: FormControl;
  groupLogo!: FormControl;
  groupType!: FormControl;
  groupLanguages!: FormArray;
  groupCategories!: FormArray;
  

  constructor(private chipService : ChipService,
              private formBuilder : FormBuilder) {}

  ngOnInit(): void {
    this.initChipsCategoriesAndSubject()
    this.initFormControls()
    this.initRegisterForm()
  }

  // Méthode pour initialiser les catégories disponibles et le subject lié.
  private initChipsCategoriesAndSubject(): void{
    this.chipsCategories = this.chipService.chipsCategories
    this.chipService.resetSelectedCategoriesSubject()
  }

  // Méthode pour initialiser tous les FormControl
  initFormControls(): void{

    // Initialisation du nom du groupe.
    this.groupName = this.formBuilder.control('', Validators.required)

    // Initialisation de la description du groupe.
    this.groupDescription = this.formBuilder.control('', Validators.required)

    // Initialisation du logo du groupe.
    this.groupLogo = this.formBuilder.control(null)

    // Initialisation du type de groupe.
    this.groupType = this.formBuilder.control('Public', Validators.required);

    // Initialisation des langues du groupe.
    this.groupLanguages = this.formBuilder.array([], Validators.required);

    // Initialisation des catégories du groupe.
    this.groupCategories = this.formBuilder.array([], Validators.required);

  }

  // Méthode pour initialiser le formulaire complet
  initRegisterForm(): void{
    this.registerForm = this.formBuilder.group({
      groupName: this.groupName,
      groupDescription: this.groupDescription,
      groupLogo: this.groupLogo,
      groupType: this.groupType,
      groupLanguages: this.groupLanguages,
      groupCategories: this.groupCategories
    })
  }

  // Méthode pour selectionner ou désectionner une catégorie.
  onHandleCategories(category: string): void {
    this.chipService.handleCategories(category)
  }

  // Méthode pour savoir si une catégorie est déjà selectionnée
  isCategorySelected(category: string): boolean {
    return this.chipService.isSelected(category)
  }

}
 