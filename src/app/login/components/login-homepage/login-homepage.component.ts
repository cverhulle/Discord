import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SharedModule } from '../../../shared/shared.module';
import { Router, RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';
import { LoginFormService } from './service/login-form.service';
import { catchError, map, of, tap } from 'rxjs';
import { TokenService } from '../../../interceptors/services/auth.service';
import { DateAdapter } from '@angular/material/core';
import { DisplayService } from '../../../shared/display/service/display.service';

@Component({
  selector: 'app-login-homepage',
  imports: [
    SharedModule,
    ReactiveFormsModule,
    RouterLink,
    NgIf
    
  ],
  templateUrl: './login-homepage.component.html',
  styleUrl: './login-homepage.component.scss'
})


export class LoginHomepageComponent implements OnInit {

  //Variables pour le chargement
  loading = false;


  //Variables pour le formulaire  
  loginForm! : FormGroup

  //Variables pour récupérer le token.
  token!: string;

  constructor(private formBuilder: FormBuilder,
              private loginFormService: LoginFormService,
              private tokenService: TokenService,
              private router : Router,
              private displayService : DisplayService) {}



  ngOnInit() {
    this.initForm()
  }

  // Cette méthode permet d'nitialiser le formulaire.
  private initForm(): void {
    this.loginForm = this.formBuilder.group({
      username: [null, Validators.required],
      password: [null, Validators.required]
    })
  }


  // Cette méthode permet d'envoyer le formulaire au back-end.
  private sendForm(data: any) {
    // On arrête le loading.
    this.loading = false;
    
    // On reset le formulaire
    this.loginForm.reset()

    // On sauvegarde le token.
    this.tokenService.saveToken(data['token'])

    // On affiche un message à l'utilisateur
    this.displayService.displayMessage('Vous êtes connecté')
        
  }  


  // Métohde à appeler à l'appui du bouton "Connexion"
  onSubmitForm() {

    // On lance le chargement
    this.loading = true;

    // On envoie le formulaire
    this.loginFormService.loginUser(this.loginForm.value).subscribe({
      next: (data) => {
        // On récupère le token et l'userId générés.
        this.sendForm(data)
        this.router.navigateByUrl('/profile')
      },
      error: (err) => {this.loading = false, 
                      this.displayService.displayMessage('Erreur lors de la connexion')}
  })
    
  }

}
