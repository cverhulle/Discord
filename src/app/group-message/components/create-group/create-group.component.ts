import { Component } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { NgFor } from '@angular/common';
import { ChipService } from '../../services/chip.service';

@Component({
  selector: 'app-create-group',
  imports: [
    SharedModule,
    NgFor
  ],
  templateUrl: './create-group.component.html',
  styleUrl: './create-group.component.scss'
})
export class CreateGroupComponent {
  
  constructor(private chipService : ChipService) {}

  // Variable pour stocker les catégories possibles
  categories = this.chipService.chipsCategories

}
 