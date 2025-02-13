import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SharedModule } from '../../../shared/shared.module';
import { RegisterFormService } from './services/register-form.service';
import { tap } from 'rxjs';
import { NgIf } from '@angular/common';
import { confirmEqualValidator } from './validators/confirm-equal.validators';


@Component({
  selector: 'app-register',
  imports: [
    SharedModule,
    ReactiveFormsModule,
    NgIf
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
  

  constructor(private formBuilder : FormBuilder,
              private registerFormService : RegisterFormService
  ) {}

  
  ngOnInit() {
    this.initFormControls();
    this.initRegisterForm();
    
  }


  private initFormControls(): void {

    // Initialisation des informations personnelles.
    this.personalInfoForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
    })

    // Initialisation de l'email.
    this.email = this.formBuilder.control('', [Validators.required, Validators.email]);
    this.confirmEmail = this.formBuilder.control('', [Validators.required, Validators.email]);
    this.emailForm = this.formBuilder.group({
      email: this.email,
      confirmEmail: this.confirmEmail
    },{
      validators: [confirmEqualValidator('email', 'confirmEmail')]
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
      validators: [confirmEqualValidator('password', 'confirmPassword')]
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


  getFormControlErrorText( ctrl: AbstractControl) : string {
    // Affiche un message d'erreur en fonction de la validation du champ.
    if (ctrl.hasError('required')) {
      return 'Ce champ est requis';
    } else if (ctrl.hasError('email')) {
      return "L\'adresse email est invalide";
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

