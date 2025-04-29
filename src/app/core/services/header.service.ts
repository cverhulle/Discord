import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable()

export class HeaderService{
    openMenuSubject = new BehaviorSubject<boolean>(false)
    openMenu$ = this.openMenuSubject.asObservable()
}