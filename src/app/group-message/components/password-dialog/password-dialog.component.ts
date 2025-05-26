import { Component, Inject } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-password-dialog',
  imports: [
    SharedModule,
    FormsModule
  ],
  templateUrl: './password-dialog.component.html',
  styleUrl: './password-dialog.component.scss'
})
export class PasswordDialogComponent {

  // Variable pour sauvegarder le mot de passe saisi
  password : string = '';

  constructor(
    public dialogRef: MatDialogRef<PasswordDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { groupName: string }
  ) {}

  onCancel(): void {
    this.dialogRef.close();
  }

  onConfirm(): void {
    this.dialogRef.close(this.password);
  }
}
