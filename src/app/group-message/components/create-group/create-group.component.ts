import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import {NgFor, NgStyle } from '@angular/common';
import { ChipService } from '../../services/chip.service';
import {FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

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
  groupType!: FormControl;

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

    // Initialisation du type de groupe.
    this.groupType = this.formBuilder.control('Public', Validators.required);
  }

  // Méthode pour initialiser le formulaire complet
  initRegisterForm(): void{
    this.registerForm = this.formBuilder.group({
      groupName: this.groupName,
      groupDescription: this.groupDescription,
      groupType: this.groupType
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
 