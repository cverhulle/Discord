import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable()

export class ErrorService {
    constructor(private matSnackBar: MatSnackBar) {}
  
    displayMessage(message: string): void {
      this.matSnackBar.open(message, 'Fermer', {
        duration: 6000,
        verticalPosition: 'top',
        horizontalPosition: 'center'
      });
    }
  }