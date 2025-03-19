import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable()

export class DisplayService {
    constructor(private matSnackBar: MatSnackBar) {}

    // Cette méthode permet d'afficher un message à l'utilisateur.
    displayMessage(message: string): void {
      this.matSnackBar.open(message, 'Fermer', {
        duration: 6000,
        verticalPosition: 'top',
        horizontalPosition: 'center'
      });
    }
  }