import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material.module';
import { PickerComponent } from '@ctrl/ngx-emoji-mart'

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MaterialModule,
    PickerComponent
  ],
  exports: [
    MaterialModule,
    PickerComponent
  ]
})

export class SharedModule { }
