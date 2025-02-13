import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
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

  registerForm! : FormGroup

  constructor(private formBuilder : FormBuilder) {}

  
  ngOnInit() {
    this.initRegisterForm();
    
  }


  initRegisterForm(): void {
    this.registerForm = this.formBuilder.group({})
  }
  

  onSubmitForm() {}

}
