import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { NgClass, NgFor } from '@angular/common';
import { ChipService } from '../../services/chip.service';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-create-group',
  imports: [
    SharedModule,
    NgFor,
    NgClass
  ],
  templateUrl: './create-group.component.html',
  styleUrl: './create-group.component.scss'
})
export class CreateGroupComponent implements OnInit{

  // Variable pour stocker les catégories possibles
  chipsCategories !: string[]

  // Variables liées au formulaire
  registerForm!: FormGroup

  constructor(private chipService : ChipService) {}

  ngOnInit(): void {
    this.initChipsCategoriesAndSubject()
  }

  // Méthode pour initialiser les catégories disponibles et le subject lié.
  private initChipsCategoriesAndSubject(): void{
    this.chipsCategories = this.chipService.chipsCategories
    this.chipService.resetSelectedCategoriesSubject()
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
 