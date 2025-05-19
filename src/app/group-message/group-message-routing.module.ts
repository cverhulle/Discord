import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageGroupMessageComponent } from './components/homepage-group-message/homepage-group-message.component';
import { AuthGuard } from '../guard/auth.guard';
import { CreateGroupComponent } from './components/create-group/create-group.component';
import { MyGroupComponent } from './components/my-group/my-group.component';
import { GroupMessageChatComponent } from './components/group-message-chat/group-message-chat.component';
import { JoinAGroupComponent } from './components/join-a-group/join-a-group.component';

const routes: Routes = [
  {path: 'create-group', component: CreateGroupComponent, canActivate: [AuthGuard]},
  {path: 'my-group', component: MyGroupComponent, canActivate: [AuthGuard]},
  {path: 'chat', component: GroupMessageChatComponent, canActivate: [AuthGuard]},
  {path : 'join-a-group', component : JoinAGroupComponent, canActivate:[AuthGuard]},
  {path: '', component : HomepageGroupMessageComponent, canActivate : [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GroupMessageRoutingModule { }
