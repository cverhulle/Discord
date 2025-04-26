import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginHomepageComponent } from './components/login-homepage/login-homepage.component';
import { RegisterComponent } from './components/register/register.component';
import { AlreadyConnectedGuard } from '../guard/already-connected.guard';

const routes: Routes = [
  { path: 'register', component: RegisterComponent, canActivate : [AlreadyConnectedGuard]},
  { path: '', component: LoginHomepageComponent, canActivate : [AlreadyConnectedGuard] }
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
