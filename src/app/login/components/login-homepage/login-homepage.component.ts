import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SharedModule } from '../../../shared/shared.module';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login-homepage',
  imports: [
    SharedModule,
    ReactiveFormsModule,
    RouterLink
    
  ],
  templateUrl: './login-homepage.component.html',
  styleUrl: './login-homepage.component.scss'
})


export class LoginHomepageComponent implements OnInit {
  
  loginForm! : FormGroup

  constructor(private formBuilder: FormBuilder) {}


  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: [null, Validators.required],
      password: [null, Validators.required]
    })


  }



  onSubmitForm() {
    console.log(this.loginForm.value)
    this.loginForm.reset()
  }
  
}
