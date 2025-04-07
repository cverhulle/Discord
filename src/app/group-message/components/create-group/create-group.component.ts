import { Component, OnInit } from '@angular/core';
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
export class CreateGroupComponent implements OnInit{

  // Variable pour stocker les catégories possibles
  chipsCategories !: string[]

  constructor(private chipService : ChipService) {}

  ngOnInit(): void {
      // Variable pour stocker les catégories possibles
      this.chipsCategories = this.chipService.chipsCategories
  }

  onHandleCategories(category: string): void {
    this.chipService.handleCategories(category)
  }


}
 