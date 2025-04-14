import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { RegisterFormService } from './components/register/services/register-form.service';
import { LoginFormService } from './components/login-homepage/service/login-form.service';
import { DisplayService } from '../shared/display/service/display.service';
import { PasswordService } from '../shared/password/service/password.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    LoginRoutingModule,
        
  ],
  providers: [
    RegisterFormService,
    LoginFormService,
    DisplayService,
    PasswordService
  ]
  
})
export class LoginModule { }
