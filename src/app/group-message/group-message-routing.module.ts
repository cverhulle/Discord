import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageGroupMessageComponent } from './components/homepage-group-message/homepage-group-message.component';
import { AuthGuard } from '../guard/auth.guard';
import { CreateGroupComponent } from './components/create-group/create-group.component';

const routes: Routes = [
  {path: 'create-group', component: CreateGroupComponent, canActivate: [AuthGuard]},
  {path: '', component : HomepageGroupMessageComponent, canActivate : [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GroupMessageRoutingModule { }
