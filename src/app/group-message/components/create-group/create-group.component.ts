import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import {AsyncPipe, NgFor, NgIf, NgStyle } from '@angular/common';
import { ChipService } from '../../services/chip.service';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormCreateGroupMessage } from '../../services/form-create-group-message.service';
import { Observable } from 'rxjs';
import { ImageService } from '../../../shared/image/services/image.services';


@Component({
  selector: 'app-create-group',
  imports: [
    SharedModule,
    NgFor,
    NgStyle,
    ReactiveFormsModule,
    NgIf,
    AsyncPipe
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

  // Observable pour gérer l'image du logo du groupe
  logoToSend$!: Observable<File | null>

  // Observable pour gérer la prévisualisation de l'image
  logoToSendUrl$!: Observable<string | null>

  constructor(private chipService : ChipService,
              private formBuilder : FormBuilder,
              private formCreateGroupMessage : FormCreateGroupMessage,
              private imageService : ImageService) {}

  ngOnInit(): void {
    this.initChipsCategoriesAndSubject()
    this.initFormControls()
    this.initRegisterForm()
    this.initObservables()
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

  // Méthode pour initialiser les Observables
  initObservables():void{
    // On initialise l'Observable pour gérer le logo à envoyer
    this.logoToSend$ = this.imageService.imageToSend$

    // On initialise l'Observable pour la prévisualisation de l'image à envoyer.
    this.logoToSendUrl$ = this.imageService.imageToSendUrl$
  }

  // Méthode à déclencher au clic sur une image. 
  onLogoToSend(event : Event): void {
    this.imageService.getImageToSend(event)   
    console.log(this.imageService.getValueOfImageToSend())   
  }

  // Méthode pour supprimer le logo au clic sur l'icone delete
  onRemoveLogo(): void {
    this.imageService.setImageToSend(null)
  }

  // Méthode pour selectionner ou désectionner une catégorie.
  onHandleCategories(category: string): void {
    this.chipService.handleCategories(category)
  }

  // Méthode pour savoir si une catégorie est déjà selectionnée.
  isCategorySelected(category: string): boolean {
    return this.chipService.isSelected(category)
  }

  // Méthode à appeler pour envoyer le formulaire au backend.
  onSubmit(): void{
    this.formCreateGroupMessage.createFormDataToSend(this.registerForm)
  }

}
 