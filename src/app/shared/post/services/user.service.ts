import { Injectable } from "@angular/core";
import { ProfileService } from "../../../profile/service/profile.service";
import { map, Observable, tap } from "rxjs";
import { usernameImage } from "../../../private-message/models/username-image.models";

@Injectable()

export class UserService{
    constructor(private profileService : ProfileService){}

    getCurrentUser(): Observable<usernameImage>{
        const currentUser = new usernameImage();
    
        return this.profileService.getProfile().pipe(
            map((profile: any) => {
                currentUser['id']= profile.user._id,
                currentUser['username']=profile.user.loginInfo.username,
                currentUser['image']=profile.user.image
                return currentUser
            })
        )
    }
}