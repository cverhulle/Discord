import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrivateMessageHomepageComponent } from './components/private-message-homepage/private-message-homepage.component';
import { AuthGuard } from '../guard/auth.guard';

const routes: Routes = [
  { path: '', component: PrivateMessageHomepageComponent, canActivate : [AuthGuard] }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class PrivateMessageRoutingModule { }
