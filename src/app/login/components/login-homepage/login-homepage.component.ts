import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../../shared/shared.module';

@Component({
  selector: 'app-login-homepage',
  imports: [
    SharedModule,
    ReactiveFormsModule
    
  ],
  templateUrl: './login-homepage.component.html',
  styleUrl: './login-homepage.component.scss'
})
export class LoginHomepageComponent implements OnInit {
  
  loginForm! : FormGroup

  constructor(private formBuilder: FormBuilder) {}


  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: [null],
      password: [null]
    })


  }



  onSubmitForm() {
    console.log(this.loginForm.value)
  }
}
