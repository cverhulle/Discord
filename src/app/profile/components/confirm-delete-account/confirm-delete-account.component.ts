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
  
  // Méthode à déclencher si l'utilisateur annule la suppression.
  onCancel(): void {
    this.dialogRef.close(false)
  }

  // Méthode à déclencher si l'utilisateur confirme la suppression.
  onConfirm(): void{
    this.dialogRef.close(true)
  }
}
