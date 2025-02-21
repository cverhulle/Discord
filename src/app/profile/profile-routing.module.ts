import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ProfileHomepageComponent } from "./components/profile-homepage/profile-homepage.component";
import { ProfileService } from "./service/profile.service";



const routes: Routes = [
    { path: ':id', component: ProfileHomepageComponent}
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
