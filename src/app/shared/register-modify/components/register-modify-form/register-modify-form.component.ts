import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SharedModule } from '../../../shared.module';
import { RegisterFormService } from '../../../../login/components/register/services/register-form.service';
import { map, Observable} from 'rxjs';
import { AsyncPipe, NgIf } from '@angular/common';
import { confirmEqualValidator } from '../../../../login/components/register/validators/confirm-equal.validators';
import { correctEmailValidator } from '../../../../login/components/register/validators/correct-email.validator'; 
import { RegisterForm } from '../../../../login/components/register/models/register-form.model';
import { ModifyProfileForm } from '../../../../profile/models/modify-profile.models';
import { RegisterModifyService } from '../../services/register-modify.service';
import { strongPasswordValidator } from '../../../validators/strong-password.validator';
import { PasswordService } from '../../../password/service/password.service';

@Component({
  selector: 'app-register-modify-form',
  imports: [
    SharedModule,
    ReactiveFormsModule,
    NgIf,
    AsyncPipe
  ],
  templateUrl: './register-modify-form.component.html',
  styleUrl: './register-modify-form.component.scss'
})


export class RegisterModifyFormComponent implements OnInit{

  // On importe les données pour pré-remplir le formulaire.
  @Input() initForm!: ModifyProfileForm | RegisterForm

  // On importe le titre de la page à afficher (Création du compte ou Modification du compte par exemple)
  @Input() titlePage!: string

  // On désactive les champs de mot de passe si besoin
  @Input() disablePasswordFields!: boolean

  // On désactive tous les champs à l'exeption du mot de passe
  @Input() disableFieldsExceptPasswords!: boolean

  // On crée un évènement pour retourner le formulaire rempli au composant parent
  @Output() fillForm = new EventEmitter<RegisterForm>

  // Variables pour le formulaire
  registerForm! : FormGroup;
  personalInfoForm! : FormGroup;
  emailForm!: FormGroup;
  email! : FormControl;
  confirmEmail! : FormControl;
  loginForm! : FormGroup;
  username! : FormControl;
  password! : FormControl;
  confirmPassword! : FormControl;
  image!: FormControl;


  //Variable pour le chargement
  loading$!: Observable<boolean>
  loadingInverse$!: Observable<boolean>

  //Variable pour stopper l'envoi du formulaire
  errorFormUsername$! : Observable<boolean>
  errorFormEmail$! : Observable<boolean>

  //Variables pour les messages d'erreur
  showEmailError$!: Observable<boolean>;
  showPasswordError$!: Observable<boolean>;

  //Variable pour afficher l'image de profil
  showImage$!: Observable<boolean>

  


  
  


  constructor(private formBuilder : FormBuilder,
              private passwordService : PasswordService,
              private registerModifyService : RegisterModifyService) 
              
              {
                this.disablePasswordFields = false
                this.disableFieldsExceptPasswords = false
                this.createInitForm()
              }


  private createInitForm() : void {
    // On initialise le formulaire à vide par défaut.
    this.initForm = {
      personalInfo: {
        firstName: '',
        lastName: ''
      },
      emailInfo: {
        email: '',
        confirmEmail: ''
      },
      loginInfo: {
        username: '',
        password: '',
        confirmPassword: ''
      },
      image: ''
    }
  }

  
  ngOnInit() {
    this.initFormControls();
    this.initRegisterForm();
    this.initObservables();
    this.initPasswordFields(this.disablePasswordFields)
    this.initFieldsExceptPasswords(this.disableFieldsExceptPasswords)
    this.initLoadingAndErrorsObservables()
    
        
  }

  


  private initFormControls(): void {

    // Initialisation des informations personnelles.
    this.personalInfoForm = this.formBuilder.group({
      firstName: [this.initForm['personalInfo']['firstName'], Validators.required],
      lastName: [this.initForm['personalInfo']['lastName'], Validators.required],
    })

    // Initialisation de l'email.
    this.email = this.formBuilder.control(this.initForm['emailInfo']['email'], [Validators.required, correctEmailValidator()]);
    this.confirmEmail = this.formBuilder.control(this.initForm['emailInfo']['confirmEmail'], [Validators.required, correctEmailValidator()]);
    this.emailForm = this.formBuilder.group({
      email: this.email,
      confirmEmail: this.confirmEmail
    },{
      validators: [confirmEqualValidator('email', 'confirmEmail')],
      updateOn: 'blur'
    })

    // Initialisation du login (username et password).
    this.username = this.formBuilder.control(this.initForm['loginInfo']['username'], [Validators.required, strongPasswordValidator()]);
    this.password = this.formBuilder.control('', [Validators.required, strongPasswordValidator()]);
    this.confirmPassword = this.formBuilder.control('', [Validators.required]);
    this.loginForm = this.formBuilder.group({
      username: this.username,
      password: this.password,
      confirmPassword: this.confirmPassword

    },{
      validators: [confirmEqualValidator('password', 'confirmPassword')],
      updateOn: 'blur'
    })

    //Initialisation de l'image de profil.
    this.image = this.formBuilder.control(this.initForm.image, {updateOn: 'blur', validators: Validators.required});

    
  }



  private initRegisterForm(): void {
    // Initialisation du formulaire d'inscription complet.
    this.registerForm = this.formBuilder.group({
      personalInfo: this.personalInfoForm,
      email: this.emailForm,
      login: this.loginForm,
      image: this.image
    })
  }



  private initObservables(): void {
    // Observable pour afficher un message d'erreur si l'email et la confirmation de l'email ne sont pas identiques.
    this.showEmailError$ = this.emailForm.statusChanges.pipe(
      map(status => status === 'INVALID' &&
          this.email.value &&
          this.confirmEmail.value &&
          this.emailForm.hasError('confirmEqual')  
        )
    )
          
    // Observable pour afficher un message d'erreur si le mot de passe et la confirmation de mot de passe ne sont pas identiques.
    this.showPasswordError$ = this.loginForm.statusChanges.pipe(
      map(status => status === 'INVALID' &&
          this.password.value &&
          this.confirmPassword.value &&
          this.loginForm.hasError('confirmEqual')  
      )
    )

    // Observable pour afficher l'image sur la page de création de compte lorsque le champ n'est pas vide.
    this.showImage$ = this.image.valueChanges.pipe(
      map(status => this.image.value !== '')
    )
  }



  private initPasswordFields(disablePasswordFields: boolean) : void {

  // Si l'argument est true, on désactive les champs relatifs aux mot de passe.
    if (this.disablePasswordFields) {
      this.password.disable();
      this.confirmPassword.disable();
    } else {
      this.password.enable();
      this.confirmPassword.enable();
    }
  }

  private initFieldsExceptPasswords(disableFieldsExceptPasswords : boolean) {
  // Si l'argument est true, on désactive tous les champs sauf ceux en rapport avec le mot de passe.
    if (this.disableFieldsExceptPasswords) {
      this.personalInfoForm.disable()
      this.emailForm.disable()
      this.username.disable()
      this.image.disable()
    } else {
      this.personalInfoForm.enable()
      this.emailForm.enable()
      this.username.enable()
      this.image.enable()
    }
      

  }




  private initLoadingAndErrorsObservables(): void{
    // Initialisation du loading
    this.loading$ = this.registerModifyService.loading$

    this.loadingInverse$ = this.registerModifyService.loading$.pipe(
      map(loading => !loading)
    );

    // Initialisation des erreurs d'username et d'email déjà utilisés
    this.errorFormEmail$ = this.registerModifyService.errorEmail$
    this.errorFormUsername$ = this.registerModifyService.errorUsername$
  }


  getFormControlErrorText( ctrl: AbstractControl) : string {
    // Affiche un message d'erreur en fonction de la validation du champ (pour les Validtors)
    if (ctrl.hasError('required')) {
      return 'Ce champ est requis';
    } else if (ctrl.hasError('correctEmail')) {
      return "Ceci n'est pas un email valide";
    } else if (ctrl.hasError('weakPassword')) {
      return "Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial."
    } else {
      return 'Ce champ contient une erreur'
    }
  }

  


  // Lorsqu'on clique sur "Username" le message d'erreur disparaît.
  onHideUsernameErrorMessage(): void {
    this.registerModifyService.setErrorUsername(false)
  }

  // Lorsqu'on clique sur "Email" le message d'erreur disparaît.
  onHideEmailErrorMessage(): void {
    this.registerModifyService.setErrorEmail(false)
  }
  

  private initSubmitForm(): void{
    //On remet les erreurs à false et on lance le chargement.
    this.registerModifyService.setErrorEmail(false);
    this.registerModifyService.setErrorUsername(false);
    this.registerModifyService.setLoading(true)
  }


  onSubmitForm(){
    this.initSubmitForm()
    this.fillForm.emit(this.registerForm.value)
  }


  


}

