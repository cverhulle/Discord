import { Injectable } from "@angular/core";
import { BehaviorSubject, catchError, map, Observable, of } from "rxjs";
import { GroupPost } from "../models/group-post.model";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment.development";
import { DisplayService } from "../../shared/display/service/display.service";

@Injectable()

export class GroupMessageService{

    constructor(    private http : HttpClient,
                    private displayService : DisplayService) {}

    // Observable et Subject pour gérer le chargement
    private loadingSubject = new BehaviorSubject<boolean>(true)
    loading$ = this.loadingSubject.asObservable()

    // Méthode pour gérer l'état du chargement
    setValueOfLoading(state : boolean): void {
        this.loadingSubject.next(state)
    }

    // Observable et Subject pour gérer le chat.
    private chatSubject = new  BehaviorSubject<GroupPost[]>([])
    chat$ = this.chatSubject.asObservable()

    // Méthode pour gérer l'état du chat.
    setValueOfChat(post : GroupPost[]): void {
        this.chatSubject.next(post)
    }

    // Méthode pour récupérer la valeur du chat
    getValueOfChat(): GroupPost[] {
        return this.chatSubject.getValue()
    }

    // Subject et Observable pour gérer si le chat est vide ou non
    private isChatEmptySubject = new BehaviorSubject<boolean>(true)
    isChatEmpty$ = this.isChatEmptySubject.asObservable()

    // Méthode pour gérer l'état de isChatEmptySubject
    setIsChatEmpty(state: boolean): void{
        this.isChatEmptySubject.next(state)
    }

    // Méthode pour récuperer la valeur de isChatEmptySubject
    getValueOfIsChatEmpty(): boolean{
        return this.isChatEmptySubject.getValue()
    }




    // Méthode pour récupérer les 10 derniers posts entre deux utilisateurs.
    getPreviousPosts(groupId: string, skip: number): Observable<GroupPost[]> {
        return this.http.get<GroupPost[]>(`${environment.apiUrl}/group-message/getPreviousPosts`, {
            params: {groupId, skip} 
        })
    }

    // Méthode pour initialiser le chat d'un groupe de discussion
    initChat(groupId: string): Observable<boolean> {
        return this.getPreviousPosts(groupId,0).pipe(
            map( (posts) => {
                const updatedChat = posts;
                if (updatedChat.length > 0) {
                    this.setIsChatEmpty(false)
                } else {
                    this.setIsChatEmpty(true)
                }
                this.setValueOfChat(updatedChat)
                return true
            }),
            catchError( () => {
                this.setValueOfChat([])
                this.displayService.displayMessage('Erreur lors du chargement de la discussion.')
                return of(false)
            })
        )
    }

    // Méthode pour créer le formData avec toutes les données pour l'envoi d'un post.
    createFormDataToSend( groupId: string, senderId: string, senderUsername: string, senderProfileImage: string, content: string, imageToSend?: File ) : FormData {
        const formData = new FormData();
        formData.append('groupId', groupId);
        formData.append('senderId', senderId);
        formData.append('senderUsername', senderUsername);
        formData.append('senderProfileImage', senderProfileImage);
        formData.append('content', content);

        if (imageToSend) {
            formData.append('imageToSend', imageToSend, imageToSend.name);
        }

        return formData
    }

    // Méthode pour créer le message, de type GroupPost, dans le Chat après l'envoi réussi au serveur
    createPostAfterSending(formData: FormData, imageInChat : string | null ): GroupPost {
        return {
            postId: formData.get('postId') ? formData.get('postId') as string : '',
            groupId: formData.get('groupId') as string,
            senderId: formData.get('senderId') as string,
            senderUsername: formData.get('senderUsername') as string,
            senderProfileImage: formData.get('senderPrifileImage') as string,
            content: formData.get('content') as string,
            timestamp: new Date(),
            imageInChat: imageInChat,
        };
    }

    // Méthode à appeler pour ajouter un message au chat.
    addPostToChat(message : GroupPost): void {
        const chat = this.getValueOfChat()
        chat.push(message)
        this.setValueOfChat(chat)        
    }

    // Méthode pour remettre un string à ''
    resetString(): string {
        return ''
    }
    
    // Méthode pour remettre l'image par défaut dans un Post à null
    resetImageToSend(): null {
        return null
    }

    // Méthode à appeler lors du succès de l'envoi du GroupPost.
    // Cette méthode retourne le chat, le booléan pour savoir si le chat est vide, le nouveau contenu du formulaire et l'image dans le GroupPost à jour.
    sendPostSuccess(message : GroupPost): {updatedMessageContent : string} {
        this.addPostToChat(message);
        const updatedMessageContent = this.resetString();
        return {updatedMessageContent}
    }
    
    // Méthode à appeler lorsque l'envoi du post a échoué.
    sendPostError(): void {
        this.displayService.displayMessage('Erreur lors de l\'envoi du message.');
    }
}