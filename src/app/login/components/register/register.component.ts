import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SharedModule } from '../../../shared/shared.module';
import { RegisterFormService } from './services/register-form.service';
import { map, Observable, tap } from 'rxjs';
import { AsyncPipe, NgIf } from '@angular/common';
import { confirmEqualValidator } from './validators/confirm-equal.validators';
import { correctEmailValidator } from './validators/correct-email.validator'; 


@Component({
  selector: 'app-register',
  imports: [
    SharedModule,
    ReactiveFormsModule,
    NgIf,
    AsyncPipe
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})

export class RegisterComponent implements OnInit{

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
  loading = false;

  //Variables pour les messages d'erreur
  showEmailError$!: Observable<boolean>;
  showPasswordError$!: Observable<boolean>;
  


  constructor(private formBuilder : FormBuilder,
              private registerFormService : RegisterFormService
  ) {}



  
  ngOnInit() {
    this.initFormControls();
    this.initRegisterForm();
    this.initObservables()
    
  }




  private initFormControls(): void {

    // Initialisation des informations personnelles.
    this.personalInfoForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
    })

    // Initialisation de l'email.
    this.email = this.formBuilder.control('', [Validators.required, correctEmailValidator()]);
    this.confirmEmail = this.formBuilder.control('', [Validators.required, correctEmailValidator()]);
    this.emailForm = this.formBuilder.group({
      email: this.email,
      confirmEmail: this.confirmEmail
    },{
      validators: [confirmEqualValidator('email', 'confirmEmail')],
      updateOn: 'blur'
    })

    // Initialisation du login (username et password).
    this.username = this.formBuilder.control('', [Validators.required, Validators.minLength(7)]);
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
    this.image = this.formBuilder.control('');
    
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

    

  }




  getFormControlErrorText( ctrl: AbstractControl) : string {
    // Affiche un message d'erreur en fonction de la validation du champ.
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
  



  onSubmitForm() {
    // Envoie du formulaire d'inscription.

    this.loading = true;
    this.registerFormService.saveUserInfo(this.registerForm.value).pipe(
      tap(saved => {
        this.loading = false;
        if (saved) {
          this.registerForm.reset();
        } else {
          console.log("Erreur lors de l\'enregistrement de l\'utilisateur");
        }
      })
    ).subscribe();
  }



}

