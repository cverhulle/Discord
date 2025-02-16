import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SharedModule } from '../../../shared/shared.module';
import { RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';
import { LoginFormService } from './service/login-form.service';
import { tap } from 'rxjs';

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



  onSubmitForm() {
    this.loading = true;
    this.loginFormService.loginUser(this.loginForm.value).pipe(
      tap( saved => {
        this.loading = false;
        if (saved) {
          this.loginForm.reset()
          console.log('Utilisateur connecté!')
        } else {
          console.log('Erreur de connexion')
        }
      })
    ).subscribe()
  }

}
