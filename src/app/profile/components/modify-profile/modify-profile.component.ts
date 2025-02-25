import { Component, OnInit } from '@angular/core';
import { RegisterComponent } from "../../../login/components/register/register.component";
import { ProfileService } from '../../service/profile.service';
import { tap } from 'rxjs';


@Component({
  selector: 'app-modify-profile',
  imports: [
    RegisterComponent
  ],
  templateUrl: './modify-profile.component.html',
  styleUrl: './modify-profile.component.scss'
})
export class ModifyProfileComponent implements OnInit{
  // On ne récupère pas le mot de passe car il est crypté.
  firstName!: string ;
  lastName!: string ;
  username!: string ;
  email!: string;
  imageUrl!: string;

  constructor( private profileService: ProfileService) {}

  ngOnInit(): void {
    this.profileService.getProfile().pipe(
          tap( (rep) => {
            this.firstName = rep['user']['personalInfo']['firstName'],
            this.lastName = rep['user']['personalInfo']['lastName'],
            this.username = rep['user']['loginInfo']['username'],
            this.email = rep['user']['emailInfo']['email'],
            this.imageUrl = rep['user']['image']
          })
        ).subscribe()
  }
  

}
