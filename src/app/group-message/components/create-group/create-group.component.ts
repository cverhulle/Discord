import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import {AsyncPipe, NgFor, NgIf, NgStyle } from '@angular/common';
import { ChipService } from '../../services/chip.service';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormCreateGroupMessageService } from '../../services/form-create-group-message.service';
import { Observable } from 'rxjs';
import { ImageService } from '../../../shared/image/services/image.services';
import { LanguageService } from '../../services/language.service';
import { ArrayNotEmpty } from '../../../shared/validators/array-not-empty.validator';
import { DisplayService } from '../../../shared/display/service/display.service';
import { LogoRequiredValidator } from '../../../shared/validators/logo-required.validator';
import { PasswordService } from '../../../shared/password/service/password.service';
import { confirmEqualValidator } from '../../../login/components/register/validators/confirm-equal.validators';
import { Router } from '@angular/router';


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

  // Variable pour stocker les catégories possibles.
  chipsCategories !: string[]

  // Variable pour stocker les languages disponibles.
  availableLanguages!: string[]

  // Observable pour gérer la visibilité du mot de passe.
  hidePassword$! : Observable<boolean>

  // Variables liées au formulaire
  registerForm!: FormGroup;
  groupName!: FormControl;
  groupDescription!: FormControl;
  groupType!: FormControl;
  groupPassword!: FormControl;
  groupConfirmPassword! : FormControl;
  groupLanguages!: FormControl;
  groupCategories!: FormControl;
  groupLogo!: FormControl;

  // Observable pour gérer l'image du logo du groupe
  logoToSend$!: Observable<File | null>

  // Observable pour gérer la prévisualisation de l'image
  logoToSendUrl$!: Observable<string | null>

  constructor(private chipService : ChipService,
              private formBuilder : FormBuilder,
              private formCreateGroupMessage : FormCreateGroupMessageService,
              private imageService : ImageService,
              private languageService : LanguageService,
              private displayService : DisplayService,
              private passwordService : PasswordService,
              private router : Router) {}

  ngOnInit(): void {
    this.initChipsCategoriesAndAvailableLanguages()
    this.resetSubjects()
    this.initFormControls()
    this.initRegisterForm()
    this.initObservables()
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
    this.imageService.resetImageToSendSubject()
  }

  // Méthode pour initialiser tous les FormControl
  initFormControls(): void{

    // Initialisation du nom du groupe.
    this.groupName = this.formBuilder.control('', Validators.required)

    // Initialisation de la description du groupe.
    this.groupDescription = this.formBuilder.control('', Validators.required)

    // Initialisation du type de groupe.
    this.groupType = this.formBuilder.control('Public', Validators.required);

    // Initialisation du mot de passe (à utiliser si le groupe est de type restreint).
    this.groupPassword = this.formBuilder.control('')

    // Initialisation du champ pour confirmer le mot de passe
    this.groupConfirmPassword = this.formBuilder.control('')

    // Initialisation du language
    this.groupLanguages = this.formBuilder.control([], ArrayNotEmpty());

    // Initialisation des catégories
    this.groupCategories = this.formBuilder.control([], ArrayNotEmpty());

    // Initialisation du logo
    this.groupLogo = this.formBuilder.control(null, LogoRequiredValidator())
  }

  // Méthode pour initialiser le formulaire complet
  initRegisterForm(): void{
    this.registerForm = this.formBuilder.group({
      groupName: this.groupName,
      groupDescription: this.groupDescription,
      groupType: this.groupType,
      groupPassword : this.groupPassword,
      groupConfirmPassword : this.groupConfirmPassword,
      groupLanguages : this.groupLanguages,
      groupCategories : this.groupCategories,
      groupLogo : this.groupLogo
    },
    {validators: [confirmEqualValidator('groupPassword', 'groupConfirmPassword')]}
  )};

  // Méthode pour activer ou désactiver le champ de mot de passe selon si le type de groupe est restreint ou non.
  activateOrDisableGroupPassword(): void{
    // On applique les validators pour le champ de mot de passe.
    this.passwordService.managePasswordValidators(this.groupType, this.groupPassword)

    // On applique les validators pour le champ de confirmation de mot de passe
    this.passwordService.managePasswordValidators(this.groupType, this.groupConfirmPassword)
  }

  // Méthode pour initialiser les Observables
  initObservables():void{
    // On initialise l'Observable pour gérer le logo à envoyer
    this.logoToSend$ = this.imageService.imageToSend$

    // Lors de l'émission du subject pour le logo, on met à jour le formControl du formulaire
    this.logoToSend$.subscribe((logo) => {
      this.groupLogo.setValue(logo);
      this.groupLogo.updateValueAndValidity();
    });

    // On initialise l'Observable pour la prévisualisation de l'image à envoyer.
    this.logoToSendUrl$ = this.imageService.imageToSendUrl$

    // On initialise l'Observable valuechanges sur groupType
    this.activateOrDisableGroupPassword()

    // On initialise l'Observable pour gérer l'affichage du mot de passe
    this.hidePassword$ = this.passwordService.hidePassword$
  }

  // Méthode à déclencher au clic sur une image. 
  onLogoToSend(event : Event): void {
    this.imageService.getImageToSend(event)   
  }

  // Méthode pour supprimer le logo au clic sur l'icone delete
  onRemoveLogo(): void {
    this.imageService.setImageToSend(null)
    this.groupLogo.markAsTouched()
    this.groupLogo.updateValueAndValidity();
  }

  // Méthode pour selectionner ou désectionner une catégorie.
  onHandleCategories(category: string): void {
    this.chipService.handleCategories(category);
    this.updateCategoriesFormControl();
  }

  // Méthode pour mettre à jour le formControl lié aux catégories
  private updateCategoriesFormControl(): void{
    const selectedCatégories = this.chipService.getValueOfSelectedCategories();
    this.groupCategories.setValue(selectedCatégories);
    this.groupCategories.markAsTouched();
    this.groupCategories.updateValueAndValidity();
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
    this.groupLanguages.markAsTouched();
    this.groupLanguages.updateValueAndValidity();
  }

  // Méthode pour savoir si une langue est sélectionnée.
  isLanguageSelected(language: string): boolean {
    return this.languageService.isSelected(language);
  }

  // Méthode pour gérer la visibilité du mot de passe
  onTogglePasswordVisibility(): void {
    this.passwordService.togglePasswordVisibility()
  }


  // Méthode pour réinitialiser le formulaire
  private resetForm(): void{
    this.registerForm.reset()
    this.resetSubjects()
  }

  // Méthode à appeler pour envoyer le formulaire au backend.
  onSubmit(): void{
    if (this.registerForm.valid) {

      // On envoie le formulaire au backend
      this.formCreateGroupMessage.sendForm(this.registerForm).subscribe((success: boolean) => {
        if (success) {

          // En cas de succès, on reset le formulaire et on affiche un message à l'utilisateur.
          this.resetForm();
          this.displayService.displayMessage("Le groupe a bien été créé !");
          this.router.navigateByUrl('/group-message/my-group')
        } else {
          this.displayService.displayMessage("Une erreur est survenue lors de la création du groupe.");
        }
      });

    } else {

      // On fait apparaître toutes les erreurs
      this.registerForm.markAllAsTouched();

      // Message pour l'utilisateur
      this.displayService.displayMessage("Erreur de l'envoi du formulaire")
    }
  }

}
 