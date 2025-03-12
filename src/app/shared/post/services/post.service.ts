import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Post } from "../models/post.model";
import { catchError, map, Observable, of } from "rxjs";
import { environment } from "../../../../environments/environment.development";

@Injectable() 

export class PostService{
    constructor(private http: HttpClient){}

    // Création du post à envoyer au backend.
    createPostToSend(currentUserId: string, otherUserId : string, username: string, image: string, message: string): Post {
        return {
        currentUserId : currentUserId,
        otherUserId : otherUserId,
        username : username,
        image : image,
        content : message,
        timestamp : new Date()
        }
    }


    
    // Méthode à appeler pour ajouter un message au chat.
    addPostToChat(message : Post, chat: Post[]): Post[] {
        chat.push(message)
        return chat
    }

    resetString(): string {
        return ''
    }



    // Méthode pour envoyer le post au backend et le sauvegarder.
    sendPost(post : Post): Observable<boolean> {
        return this.http.post(`${environment.apiUrl}/private-message/post`, post).pipe(
            map( () => true),
            catchError( () => of(false))
        )
    }

    // Méthode pour récupérer tous les posts entre l'utilisateur actuel et celui avec lequel il communique (à partir de son id).
    getAllPosts(otherUserId: string): Observable<Post[]> {
        return this.http.get<Post[]>(`${environment.apiUrl}/private-message/getPosts`, {
            params: {otherUserId} 
        })
    }

    // Méthode pour récupérer les 10 derniers posts entre deux utilisateurs.
    getPreviousPosts(otherUserId: string, skip: number): Observable<Post[]> {
        return this.http.get<Post[]>(`${environment.apiUrl}/private-message/getPosts/previous`, {
            params: {otherUserId, skip} 
        })
    }

    // Méthode pour gérer la couleur des cartes de messages.
    getPostCardColor(postId: string, currentUserId: string) : string {
        if(postId === currentUserId) {
            return 'rgb(48, 92, 70)'
        } else {
            return  'rgb(97, 18, 97)'
        }
    }

    // Cette méthode vérifie si le message n'est pas vide et si sa longueur ne dépasse pas maxLenght (500 par défaut).
    messageValid(message: string, maxLenght: number = 500): boolean {
        
        // trim supprime les espaces au début et à la fin de message.
        return message.trim().length > 0 && message.length <= maxLenght;
    }
}

