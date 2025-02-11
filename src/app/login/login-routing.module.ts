import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginHomepageComponent } from './components/login-homepage/login-homepage.component';

const routes: Routes = [
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
