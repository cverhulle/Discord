import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrivateMessageHomepageComponent } from './components/private-message-homepage/private-message-homepage.component';
import { AuthGuard } from '../guard/auth.guard';
import { PrivateMessageChatComponent } from './components/private-message-chat/private-message-chat.component';

const routes: Routes = [
  { path: '', component: PrivateMessageHomepageComponent, canActivate : [AuthGuard] },
  { path: 'chat', component: PrivateMessageChatComponent, canActivate : [AuthGuard] }
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
