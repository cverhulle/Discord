import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GroupMessageRoutingModule } from './group-message-routing.module';
import { ChipService } from './services/chip.service';
import { FormCreateGroupMessage } from './services/form-create-group-message.service';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    GroupMessageRoutingModule
  ],
  providers: [
    ChipService,
    FormCreateGroupMessage
  ]
})
export class GroupMessageModule { }
