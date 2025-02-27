import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
    providedIn : 'root'
})

export class RegisterModifyService{

    // Variable pour le loading
    private loadingSuject = new BehaviorSubject<boolean>(false)
    loading$ = this.loadingSuject.asObservable()

    setLoading(loading: boolean) {
        this.loadingSuject.next(loading)
    }
}
