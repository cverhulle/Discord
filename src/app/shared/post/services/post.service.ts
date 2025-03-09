import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Post } from "../models/post.model";
import { catchError, map, Observable, of } from "rxjs";
import { environment } from "../../../../environments/environment.development";

@Injectable() 

export class PostService{
    constructor(private http: HttpClient){}

    sendPost(post : Post): Observable<boolean> {
        return this.http.post(`${environment.apiUrl}/private-message/post`, post).pipe(
            map( () => true),
            catchError( () => of(false))
        )
    }

    getAllPosts(otherUserId: string): Observable<Post[]> {
        return this.http.get<Post[]>(`${environment.apiUrl}/private-message/getPosts`, {
            params: {otherUserId} 
        })
    }

    getPostCardColor(postId: string, currentUserId: string) : string {
        if(postId === currentUserId) {
            return 'rgb(0,255,255'
        } else {
            return  'rgb(97, 18, 97)'
        }
    }
}

