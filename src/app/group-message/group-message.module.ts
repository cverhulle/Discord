import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GroupMessageRoutingModule } from './group-message-routing.module';
import { ChipService } from './services/chip.service';
import { FormCreateGroupMessageService } from './services/form-create-group-message.service';
import { ImageService } from '../shared/image/services/image.services';
import { LanguageService } from './services/language.service';
import { DisplayService } from '../shared/display/service/display.service';
import { PasswordService } from '../shared/password/service/password.service';
import { SearchAGroupService } from './services/search-a-group.service';
import { AvatarService } from '../shared/avatar/service/avatar.service';
import { PostService } from '../shared/post/services/post.service';
import { UserService } from '../shared/post/services/user.service';
import { EmojisService } from '../shared/emojis/services/emojis.service';
import { ProfileService } from '../profile/service/profile.service';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    GroupMessageRoutingModule
  ],
  providers: [
    ChipService,
    FormCreateGroupMessageService,
    ImageService,
    LanguageService,
    DisplayService,
    PasswordService,
    SearchAGroupService,
    AvatarService,
    PostService,
    UserService,
    EmojisService,
    ProfileService
  ]
})
export class GroupMessageModule { }
