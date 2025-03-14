import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrivateMessageRoutingModule } from './private-message-routing.module';
import { PrivateMessageService } from './service/private-message.service';
import { ProfileService } from '../profile/service/profile.service';
import { AvatarService } from '../shared/avatar/service/avatar.service';
import { PostService } from '../shared/post/services/post.service';
import { UserService } from '../shared/post/services/user.service';
import { DisplayService } from '../shared/display/service/display.service';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    PrivateMessageRoutingModule
  ],
  providers: [
    PrivateMessageService,
    ProfileService,
    AvatarService,
    PostService,
    UserService,
    DisplayService
  ]
})
export class PrivateMessageModule { }
