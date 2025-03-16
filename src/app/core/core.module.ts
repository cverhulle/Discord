import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { DisplayService } from '../shared/display/service/display.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule
  ],
  exports: [
    SharedModule
  ],
  providers:[
    DisplayService
  ]

})


export class CoreModule { }
