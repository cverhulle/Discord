import { Component } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';

@Component({
  selector: 'app-confirm-delete-account',
  imports: [
    SharedModule
  ],
  templateUrl: './confirm-delete-account.component.html',
  styleUrl: './confirm-delete-account.component.scss'
})
export class ConfirmDeleteAccountComponent {

}
