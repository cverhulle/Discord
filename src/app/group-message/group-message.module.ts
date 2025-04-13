import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GroupMessageRoutingModule } from './group-message-routing.module';
import { ChipService } from './services/chip.service';
import { FormCreateGroupMessageService } from './services/form-create-group-message.service';
import { ImageService } from '../shared/image/services/image.services';
import { LanguageService } from './services/language.service';
import { DisplayService } from '../shared/display/service/display.service';
import { PasswordService } from '../shared/password/service/password.service';


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
    PasswordService
  ]
})
export class GroupMessageModule { }
