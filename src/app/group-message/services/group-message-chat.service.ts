import { Injectable } from "@angular/core";
import { BehaviorSubject, catchError, map, Observable, of } from "rxjs";
import { GroupPost } from "../models/group-post.model";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment.development";
import { DisplayService } from "../../shared/display/service/display.service";
import { ImageService } from "../../shared/image/services/image.services";
import { EmojisService } from "../../shared/emojis/services/emojis.service";


@Injectable()

export class GroupMessageService{

    constructor(    private http : HttpClient,
                    private displayService : DisplayService,
                    private imageService : ImageService,
                    private emojiService : EmojisService) {}
    
    // Subject pour gérer les informations sur le groupe
    private groupIdSubject = new BehaviorSubject<string>('');
    private groupNameSubject = new BehaviorSubject<string>('');
    private groupLogoSubject = new BehaviorSubject<string>('');

    // Observables pour les informations du groupe
    groupId$ = this.groupIdSubject.asObservable();
    groupName$ = this.groupNameSubject.asObservable();
    groupLogo$ = this.groupLogoSubject.asObservable();

    // Méthode pour fixer la valeur du subject groupId
    setValueOfGroupId(id: string) {
    this.groupIdSubject.next(id);
    }

    // Méthode pour fixer la valeur du subject groupName
    setValueOfGroupName(name: string) {
        this.groupNameSubject.next(name);
    }

    // Méthode pour fixer la valeur du subject groupLogo
    setValueOfGroupLogo(logo: string) {
        this.groupLogoSubject.next(logo);
    }

    // Méthode pour obtenir la valeur du subject groupIdSubject
    getValueOfGroupIdSubject(): string{
        return this.groupIdSubject.getValue()
    }

    // Méthode pour obtenir la valeur du subject groupNameSubject
    getValueOfGroupNameSubject(): string{
        return this.groupNameSubject.getValue()
    }

    // Méthode pour obtenir la valeur du subject groupLogoSubject
    getValueOfGroupLogoSubject(): string{
        return this.groupLogoSubject.getValue()
    }

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

    // Observable pour réagir lorsque l'utilisateur modifie un message.
    private editMessageSubject = new BehaviorSubject<GroupPost | null>(null);
    editMessage$ = this.editMessageSubject.asObservable();

    // Méthode pour modifier le statut de l'observable editMessage.
    setValueOfEditMessage(post : GroupPost | null): void {
        this.editMessageSubject.next(post)
        if (post) {
            this.resetOpacityEmojisDisplayAndImageToSend(false)
            this.displayService.displayMessage('Vous modifiez un message')
            this.imageService.setValueOfImageToSendUrlWithPath(post.imageInChat)
        } 
    }

    // Méthode pour récupérer la valeur de editMessageSubject
    getValueOfEditMessageSubject() : GroupPost | null {
        return this.editMessageSubject.getValue()
    }

    // Méthode pour retirer une image dans un post
    removeImageInPost(): void { 
        this.imageService.setImageToSend(null)
        if(this.getValueOfEditMessageSubject()) {
            this.imageService.setDeleteImageInModifiedPost(true)
        }
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



    // Méthode pour créer le formData avec toutes les données pour l'envoi d'un post.
    createFormDataToSend( groupId: string, senderId: string, senderUsername: string, senderProfileImage: string, content: string, imageToSend?: File | null, postId? : string, previousImage? : string | null,  removeImage?: boolean ) : FormData {
        const formData = new FormData();
        formData.append('groupId', groupId);
        formData.append('senderId', senderId);
        formData.append('senderUsername', senderUsername);
        formData.append('senderProfileImage', senderProfileImage);
        formData.append('content', content);

        if(postId) {
            formData.append("postId", postId)
        }

        if(previousImage) {
            formData.append("previousImage", previousImage)
        }

        if (imageToSend) {
            formData.append('imageToSend', imageToSend, imageToSend.name);
        }

        if(removeImage) {
            formData.append("removeImage", "removeImage")
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

    // Méthode pour envoyer un post et l'enregistrer sur le serveur.
    sendPost(formData: FormData): Observable<{ updatedMessageContent: string}> {
        return this.http.post<{ message: string, postId: string, imageInChat?: string }>(`${environment.apiUrl}/group-message/send-message`, formData).pipe(
            map(response => {
                const postId = response.postId;
                if (postId) {
                    // Ajouter le postId au FormData pour les traitements futurs
                    formData.append('postId', postId);

                    // On sauvegarde l'url de l'image, ou null, dans umageInChat
                    const imageInChat = response.imageInChat? response.imageInChat : null

                    // On construit le GroupPost dans le front-End pour l'afficher 
                    const message = this.createPostAfterSending(formData, imageInChat)

                    // On remet à zéro les variables
                    this.resetOpacityEmojisDisplayAndImageToSend(true)

                    // On émet que le chat n'est pas vide
                    this.setIsChatEmpty(false)
                    
                    // Appelle la méthode pour mettre à jour l'affichage du chat
                    return this.sendPostSuccess(message);

                } else {
                    this.sendPostError();
                    return {updatedMessageContent: formData.get('content') as string };
                }
            }),
            catchError(() => {
                this.sendPostError();
                return of({ updatedMessageContent: formData.get('content') as string});
            })
        );
    }

    // Méthode pour modifier un message dans le backend.
    updatePostBackend(formData : FormData) : Observable<GroupPost> {
        return this.http.put<GroupPost>(`${environment.apiUrl}/group-message/updateGroupPost`, formData).pipe(
            catchError( () => {
                this.displayService.displayMessage('Erreur lors de la modification du message.')
                return of()
            })
        )
    }

    // Méthode pour modifier un message
    updatePost(editedPost : GroupPost, newContent : string, newImage : File | null, deleteCurrentImage : boolean): Observable<boolean> {
        if (!newImage && !deleteCurrentImage && (this.getValueOfEditMessageSubject()?.content === newContent)) {
            return of(false)
        }
        
        const formData = this.createFormDataToSend(
            editedPost.groupId,
            editedPost.senderId,
            editedPost.senderUsername,
            editedPost.senderProfileImage,
            newContent,
            newImage,
            editedPost.postId,
            editedPost.imageInChat,
            deleteCurrentImage
        );
        
        return this.updatePostBackend(formData).pipe(
            map((updatedPost) => {
                const chat = this.getValueOfChat()
                const messageIndex = chat.findIndex(post => post.postId === updatedPost.postId);
                chat[messageIndex] = updatedPost;
                this.setValueOfChat(chat)
                this.resetModifiedPostStuff()
                return true
                
            }),
            catchError( () => {
                this.displayService.displayMessage('Erreur lors de la modification du message')
                return of(false)
            })
        )
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

    // Méthode pour charger 10 messages de plus dans une discussion entre deux utilisateurs.
    loadMoreMessages(groupId: string): Observable<boolean> {
        this.setValueOfLoading(true)
        const chat = this.getValueOfChat()
        const skip = chat.length;
        return this.getPreviousPosts(groupId, skip).pipe(
            map( (posts) => {
                this.setValueOfChat([...posts, ...chat])
                this.setValueOfLoading(false)
                return true
            }),
            catchError( () => {
                this.displayService.displayMessage('Erreur lors du chargement des messages précédents.')
                this.setValueOfLoading(false)
                return of(false)
            })
        )
    }

    // Méthode pour supprimer un post.
    deletePost(postId: string): Observable<boolean> {
        this.setValueOfLoading(true)
        return this.http.delete(`${environment.apiUrl}/group-message/deleteGroupPost`, {
            params: {postId}
        }).pipe(
            map( () => {
                const chat = this.getValueOfChat()
                const updatedChat = chat.filter( post => post.postId !== postId)
                this.setValueOfChat(updatedChat)
                this.displayService.displayMessage('Message supprimé avec succès.')
                if (updatedChat.length === 0) {
                    this.setIsChatEmpty(true)
                }
                this.setValueOfLoading(false)
                return true
        }),
            catchError( () => {
                this.displayService.displayMessage('Erreur lors de la suppression du message.')
                this.setValueOfLoading(false)
                return of(false)
        }) 
        )
    }

    // Méthode pour gérer la couleur des cartes de messages.
    getPostCardColor(postsenderId: string, currentUserId: string) : string {
        if(postsenderId === currentUserId) {
            return '#283e6e'
        } else {
            return  '#5e3a8c'
        }
    }


    // Cette méthode vérifie si le message n'est pas vide et si sa longueur ne dépasse pas maxLenght (500 par défaut).
    messageValid(message: string, maxLenght: number = 500): boolean {
        
        // trim supprime les espaces au début et à la fin de message.
        return message.trim().length > 0 && message.length <= maxLenght;
    }

    // Méthode pour réinitialiser l'opacité du bandeau, l'affichage des émojis 
    resetOpacityEmojisDisplayAndImageToSend(resetImageToSend : boolean): void{
        this.imageService.resetValueOfOpacity()
        this.emojiService.resetEmojisDisplay()
        if (resetImageToSend) {
            this.imageService.setImageToSend(null)
        }
    }

    // Méthode pour réinitialiser les variables liés à la modification d'un post.
    resetModifiedPostStuff(): void {
        this.setValueOfEditMessage(null)
        this.imageService.setDeleteImageInModifiedPost(false)
        this.resetOpacityEmojisDisplayAndImageToSend(true)
    }

    // Méthode pour réinitialiser les données du groupe
    resetGroupInfos(): void{
        this.setValueOfGroupId('')
        this.setValueOfGroupLogo('')
        this.setValueOfGroupName('')
    }

    // Méthode pour réinitialiser tous les subjects
    resetAllSubjects(): void{
        this.resetGroupInfos()
        this.resetModifiedPostStuff()
    }
}