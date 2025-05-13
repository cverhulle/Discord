import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable()

export class GroupMessageService{
    // Observable et Subject pour gérer le chargement
    private loadingSubject = new BehaviorSubject<boolean>(true)
    loading$ = this.loadingSubject.asObservable()

    // Méthode pour gérer l'état du chargement
    setValueOfLoading(state : boolean): void {
        this.loadingSubject.next(state)
    }
}