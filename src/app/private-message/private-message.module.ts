import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrivateMessageRoutingModule } from './private-message-routing.module';
import { PrivateMessageService } from './service/private-message.service';
import { ProfileService } from '../profile/service/profile.service';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    PrivateMessageRoutingModule
  ],
  providers: [
    PrivateMessageService,
    ProfileService
  ]
})
export class PrivateMessageModule { }
