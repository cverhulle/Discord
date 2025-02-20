import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginHomepageComponent } from './components/login-homepage/login-homepage.component';
import { RegisterComponent } from './components/register/register.component';

const routes: Routes = [
  { path: 'register', component: RegisterComponent },
  { path: '', component: LoginHomepageComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
    
  exports: [
    RouterModule
  ]
})

export class LoginRoutingModule { }
