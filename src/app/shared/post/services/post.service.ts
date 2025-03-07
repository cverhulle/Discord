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

    getAllPosts(): Observable<Post[]> {
        return this.http.get<Post[]>(`${environment.apiUrl}/private-message/getPost`)
    }
}

