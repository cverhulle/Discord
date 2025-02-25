import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ProfileHomepageComponent } from "./components/profile-homepage/profile-homepage.component";
import { ProfileService } from "./service/profile.service";
import { AuthGuard } from "../guard/auth.guard";



const routes: Routes = [
    { path: ':id', component: ProfileHomepageComponent, canActivate : [AuthGuard]},
    { path: '', component: ProfileHomepageComponent, canActivate : [AuthGuard]},
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
    ProfileService
  ]
})

export class ProfileRoutingModule { }
