import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProfileService } from '../../service/profile.service';
import { tap } from 'rxjs';


@Component({
  selector: 'app-profile-homepage',
  imports: [],
  templateUrl: './profile-homepage.component.html',
  styleUrl: './profile-homepage.component.scss'
})
export class ProfileHomepageComponent implements OnInit{
  userId!: string

  constructor(private route: ActivatedRoute,
              private profilService : ProfileService) {}

  ngOnInit(): void {
    this.userId = this.route.snapshot.params['id']
    this.profilService.getProfile(this.userId).pipe(
      tap( (rep) => console.log(rep))
    ).subscribe()
  }  

}
