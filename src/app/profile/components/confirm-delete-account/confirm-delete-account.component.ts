import { Component } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-delete-account',
  imports: [
    SharedModule
  ],
  templateUrl: './confirm-delete-account.component.html',
  styleUrl: './confirm-delete-account.component.scss'
})
export class ConfirmDeleteAccountComponent {
  constructor(public dialogRef : MatDialogRef<ConfirmDeleteAccountComponent>) {}
  
  onCancel(): void {
    this.dialogRef.close(false)
  }

  onConfirm(): void{
    this.dialogRef.close(true)
  }
}
