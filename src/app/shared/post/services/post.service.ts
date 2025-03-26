import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Post } from "../models/post.model";
import { BehaviorSubject, catchError, map, Observable, of} from "rxjs";
import { environment } from "../../../../environments/environment.development";
import { DisplayService } from "../../display/service/display.service";

@Injectable() 

export class PostService{
    constructor(private http: HttpClient,
                private displayService: DisplayService){}

    // Observable pour réagir lorsque l'utilisateur modifie un message.
    private editMessageSubject = new BehaviorSubject<Post | null>(null);
    editMessage$ = this.editMessageSubject.asObservable();

    // Méthode pour modifier le statut de l'observable editMessage.
    setEditMessage(post : Post | null): void {
        this.editMessageSubject.next(post)
    }

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

    // Méthode pour remettre un string à ''
    resetString(): string {
        return ''
    }
    
    // Méthode pour vérifier si le chat est vide ou non
    IsChatEmpty(chat: Post[]): boolean {
        return chat.length === 0
    }

    // Méthode à appeler lors du succès de l'envoi du Post.
    // Cette méthode retourne le chat, le booléan pour savoir si le chat est vide, le nouveau contenu du formulaire et l'image dans le Post à jour.
    sendPostSuccessTest(message : Post, chat: Post[]): {updatedChat: Post[], updatedChatIsEmpty : boolean, updatedMessageContent : string, updatedImageToSend: null} {
        const updatedChat = this.addPostToChat(message, chat);
        const updatedChatIsEmpty = this.IsChatEmpty(updatedChat);
        const updatedMessageContent = this.resetString();
        const updatedImageToSend = null
        return {updatedChat, updatedChatIsEmpty, updatedMessageContent, updatedImageToSend}
    }

    // Méthode à appeler lorsque l'envoi du post a échoué.
    sendPostError(): void {
        this.displayService.displayMessage('Erreur lors de l\'envoi du message.');
    }


    sendPostWithOptionalImage(formData: FormData, chat: Post[]): Observable<{ updatedChat: Post[], updatedChatIsEmpty: boolean, updatedMessageContent: string, updatedImageToSend: null }> {
        return this.http.post<{ message: string, postId: string, imageInChat?: string }>(`${environment.apiUrl}/private-message/send-message-image-test`, formData).pipe(
            map(response => {
                const postId = response.postId;
                if (postId) {
                    // Ajouter le postId au FormData pour les traitements futurs
                    formData.append('postId', postId);
                    
                    // Créer un message à partir des données du FormData
                    const message: Post = {
                        postId: formData.get('postId') ? formData.get('postId') as string : '',
                        currentUserId: formData.get('currentUserId') as string,
                        otherUserId: formData.get('otherUserId') as string,
                        username: formData.get('username') as string,
                        image: formData.get('image') as string,
                        content: formData.get('content') as string,
                        timestamp: new Date(),
                        imageInChat: response.imageInChat || null
                    };
    
                    return this.sendPostSuccessTest(message, chat);
                } else {
                    this.sendPostError();
                    return { updatedChat: chat, updatedChatIsEmpty: this.IsChatEmpty(chat), updatedMessageContent: '', updatedImageToSend: null };
                }
            }),
            catchError(() => {
                this.sendPostError();
                return of({ updatedChat: chat, updatedChatIsEmpty: this.IsChatEmpty(chat), updatedMessageContent: '', updatedImageToSend: null });
            })
        );
    }

    // Méthode pour modifier un message dans le backend.
    updatePostBackend(post: Post) : Observable<Post> {
        return this.http.put<Post>(`${environment.apiUrl}/private-message/updatePost`, post).pipe(
            catchError( () => {
                this.displayService.displayMessage('Erreur lors de la modification du message.')
                return of(post)
            })
        )
    }

    // Méthode pour modifier un message
    updatePost(editedPost : Post, newContent : string): Observable<Post>{
        const updatedPost = {
            postId : editedPost.postId,
            currentUserId : editedPost.currentUserId,
            otherUserId : editedPost.otherUserId,
            username : editedPost.username,
            image : editedPost.image,
            content : newContent,
            timestamp : editedPost.timestamp
          };
          
        
        return this.updatePostBackend(updatedPost).pipe(
            map((post) => {
                return post;
            }),
            catchError( () => {
                this.displayService.displayMessage('Erreur lors de la modification du message')
                return of(editedPost)
            })
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

    // Méthode pour initialiser le chat en connaissant l'userId de l'autre utilisateur (10 messages cf backend pour changer).
    initChat(otherUserId: string): Observable<{updatedChat: Post[], updatedChatIsEmpty: boolean}> {
        return this.getPreviousPosts(otherUserId,0).pipe(
            map( (posts) => {
              const updatedChat = posts;
              const updatedChatIsEmpty = this.IsChatEmpty(updatedChat)
              return ({updatedChat, updatedChatIsEmpty})
            }),
            catchError( () => {
              this.displayService.displayMessage('Erreur lors du chargement de la discussion.')
              return of({updatedChat: [], updatedChatIsEmpty: true})
            })
        )
    }

    // Méthode pour charger 10 messages de plus dans une discussion entre deux utilisateurs.
    loadMoreMessages(otherUserId: string, chat: Post[]): Observable<Post[]> {
        const skip = chat.length;
        return this.getPreviousPosts(otherUserId, skip).pipe(
            map( (posts) => {
                return [...posts, ...chat]
            }),
            catchError( () => {
                this.displayService.displayMessage('Erreur lors du chargement des messages précédents.')
                return of(chat)
            })
        )
    }

    // Méthode pour supprimer un post.
    deletePost(postId: string, chat: Post[]): Observable<Post[]> {
        return this.http.delete(`${environment.apiUrl}/private-message/deletePost`, {
            params: {postId}
        }).pipe(
            map( () => {
                const updatedChat = chat.filter( post => post.postId !== postId)
                this.displayService.displayMessage('Message supprimé avec succès.')
                return updatedChat
        }),
            catchError( () => {
                this.displayService.displayMessage('Erreur lors de la suppression du message.')
                return of(chat)
        }) 
        )
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

