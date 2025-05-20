import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable()

// Ce service permet de gérer l'envoi du formulaire pour rejoindre un groupe
export class JoinAGroupService{

    constructor(private hhtp: HttpClient) {}
}