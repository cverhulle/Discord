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


  private sendForm(saved: boolean) {
    // On arrête le loading.
    this.loading = false;

        if (saved) {
          this.loginForm.reset()

          // On sauvegarde le token et l'userId si l'envoi est réussi.
          console.log(this.userId)
          console.log(this.token)
          console.log('Utilisateur connecté!')
          localStorage.setItem('token',this.token)
          localStorage.setItem('userId', this.userId)

        } else {
          // Si l'envoi échoue, on affiche une erreur
          console.log('Erreur de connexion')
        }

  }



  onSubmitForm() {

    // On lance le chargement
    this.loading = true;

    // On envoie le formulaire
    this.loginFormService.loginUser(this.loginForm.value).pipe(

      // On récupère le token et l'userId générés.
      tap( data => {
        this.token= data['token'];
        this.userId = data['userId']
      }),

      // Si l'envoi réussi, on modifie l'émission à True.
      map( () => true),

      // Si l'envoi échoue, on modifie l'émission à False.
      catchError((status) => of(false)),

      // Si l'envoi réussi, on envoie le formulaire et on sauvegarde le token.
      tap( saved => {
        this.sendForm(saved)
      })
    ).subscribe()

  }

}
