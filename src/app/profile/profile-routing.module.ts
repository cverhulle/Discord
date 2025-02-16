import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ProfileHomepageComponent } from "./components/profile-homepage/profile-homepage.component";



const routes: Routes = [
    { path: '', component: ProfileHomepageComponent}
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
    
  exports: [
    RouterModule
  ]
})

export class ProfileRoutingModule { }
