import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { GroupPost } from "../models/group-post.model";

@Injectable()

export class GroupMessageService{
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
}