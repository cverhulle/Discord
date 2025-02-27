import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SharedModule } from '../../../shared/shared.module';
import { RegisterFormService } from '../../../login/components/register/services/register-form.service';
import { map, Observable} from 'rxjs';
import { AsyncPipe, NgIf } from '@angular/common';
import { confirmEqualValidator } from '../../../login/components/register/validators/confirm-equal.validators';
import { correctEmailValidator } from '../../../login/components/register/validators/correct-email.validator'; 
import { RegisterForm } from '../../../login/components/register/models/register-form.model';
import { ModifyProfileForm } from '../../../profile/models/modify-profile.models';
import { RegisterModifyService } from '../../services/register-modify.service';

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
  errorFormUsername = false;
  errorFormEmail = false ;

  //Variables pour les messages d'erreur
  showEmailError$!: Observable<boolean>;
  showPasswordError$!: Observable<boolean>;

  //Variable pour afficher l'image de profil
  showImage$!: Observable<boolean>

  


  
  


  constructor(private formBuilder : FormBuilder,
              private registerFormService : RegisterFormService,
              private registerModifyService : RegisterModifyService) {}



  
  ngOnInit() {
    this.initFormControls();
    this.initRegisterForm();
    this.initObservables();
    this.initPasswordFields(this.disablePasswordFields)

    //Variable pour le chargement
    this.loading$ = this.registerModifyService.loading$

    this.loadingInverse$ = this.registerModifyService.loading$.pipe(
      map(loading => !loading)
    );
        
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
    this.username = this.formBuilder.control(this.initForm['loginInfo']['username'], [Validators.required, Validators.minLength(7)]);
    this.password = this.formBuilder.control('', [Validators.required]);
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
    if (this.disablePasswordFields) {
      this.password.disable();
      this.confirmPassword.disable();
    } else {
      this.password.enable();
      this.confirmPassword.enable();
    }
  }

  getFormControlErrorText( ctrl: AbstractControl) : string {
    // Affiche un message d'erreur en fonction de la validation du champ (pour les Validtors)
    if (ctrl.hasError('required')) {
      return 'Ce champ est requis';
    } else if (ctrl.hasError('correctEmail')) {
      return "Ceci n'est pas un email valide";
    } else if (ctrl.hasError('minlength')) {
      return 'Ce champ doit contenir au moins 7 caractères';
    } else {
      return 'Ce champ contient une erreur'
    }
  }


  // Lorsqu'on clique sur "Username" le message d'erreur disparaît.
  onHideUsernameErrorMessage(): void {
    this.errorFormUsername = false
  }

  // Lorsqu'on clique sur "Email" le message d'erreur disparaît.
  onHideEmailErrorMessage(): void {
    this.errorFormEmail = false
  }


  onSubmitForm(){
    this.registerModifyService.setLoading(true)
    this.fillForm.emit(this.registerForm.value)
  }


  


}

