import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SharedModule } from '../../../shared/shared.module';


@Component({
  selector: 'app-register',
  imports: [
    SharedModule,
    ReactiveFormsModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})

export class RegisterComponent implements OnInit{

  registerForm! : FormGroup;
  personalInfoForm! : FormGroup;
  emailForm!: FormGroup;
  email! : FormControl;
  confirmEmail! : FormControl;
  loginForm! : FormGroup;
  username! : FormControl;
  password! : FormControl;
  confirmPassword! : FormControl;
  

  constructor(private formBuilder : FormBuilder) {}

  
  ngOnInit() {
    this.initFormControls();
    this.initRegisterForm();
    
  }


  private initFormControls(): void {
    this.personalInfoForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
    })


    this.email = this.formBuilder.control('', [Validators.required]);
    this.confirmEmail = this.formBuilder.control('', [Validators.required]);
    this.emailForm = this.formBuilder.group({
      email: this.email,
      confirmEmail: this.confirmEmail
    })


    this.username = this.formBuilder.control('', [Validators.required]);
    this.password = this.formBuilder.control('', [Validators.required]);
    this.confirmPassword = this.formBuilder.control('', [Validators.required]);
    this.loginForm = this.formBuilder.group({
      username: this.username,
      password: this.password,
      confirmPassword: this.confirmPassword

    })
    
  }


  private initRegisterForm(): void {
    this.registerForm = this.formBuilder.group({})
  }
  


  onSubmitForm() {}

}
