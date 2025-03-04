import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { usernameImage } from "../models/username-image.models";
import { environment } from "../../../environments/environment.development";

@Injectable()

export class PrivateMessageService {
    constructor(private http: HttpClient) {}

    searchQueryUsers(query: string) : Observable<usernameImage[]> {
        return this.http.get<usernameImage[]>(`${environment.apiUrl}/private-message/queryUsers?search=${query}`)
    }
}