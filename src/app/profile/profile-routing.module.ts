import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ProfileHomepageComponent } from "./components/profile-homepage/profile-homepage.component";
import { ProfileService } from "./service/profile.service";
import { AuthGuard } from "../guard/auth.guard";
import { ModifyProfileComponent } from "./components/modify-profile/modify-profile.component";
import { RegisterFormService } from "../login/components/register/services/register-form.service";



const routes: Routes = [
    { path: '', component: ProfileHomepageComponent, canActivate : [AuthGuard]},
    { path: 'modify', component: ModifyProfileComponent, canActivate : [AuthGuard]},
    { path: '*', redirectTo: ''}
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
    
  exports: [
    RouterModule
  ],
  providers:[
    ProfileService,
    RegisterFormService
  ]
})

export class ProfileRoutingModule { }
