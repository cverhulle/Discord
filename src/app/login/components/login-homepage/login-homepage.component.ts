import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SharedModule } from '../../../shared/shared.module';
import { RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';
import { LoginFormService } from './service/login-form.service';
import { catchError, map, of, tap } from 'rxjs';

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

  //Variables pour récupérer le token et l'userId.
  userId!: string;
  token!: string;

  constructor(private formBuilder: FormBuilder,
              private loginFormService: LoginFormService
  ) {}



  ngOnInit() {
    // Initialisation du formulaire
    this.loginForm = this.formBuilder.group({
      username: [null, Validators.required],
      password: [null, Validators.required]
    })
  }


  private sendForm(data: any) {
    // On arrête le loading.
    this.loading = false;
    
    // On reset le formulaire
    this.loginForm.reset()

    // On sauvegarde le token et l'userId et, on affiche un message de réussite
    console.log('Utilisateur connecté!')
    localStorage.setItem('token',data['token'])
    localStorage.setItem('userId', data['userId'])
  }  



  onSubmitForm() {

    // On lance le chargement
    this.loading = true;

    // On envoie le formulaire
    this.loginFormService.loginUser(this.loginForm.value).subscribe({
      next: (data) => {
        // On récupère le token et l'userId générés.
        this.sendForm(data)
      },
      error: (err) => {this.loading = false, 
                      console.log('Erreur de connexion')}
  })

  }

}
