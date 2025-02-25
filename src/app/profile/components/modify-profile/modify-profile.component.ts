import { Component } from '@angular/core';
import { RegisterComponent } from "../../../login/components/register/register.component";
import { FormBuilder } from '@angular/forms';
import { RegisterFormService } from '../../../login/components/register/services/register-form.service';

@Component({
  selector: 'app-modify-profile',
  imports: [
    RegisterComponent
  ],
  templateUrl: './modify-profile.component.html',
  styleUrl: './modify-profile.component.scss'
})
export class ModifyProfileComponent {

  

}
