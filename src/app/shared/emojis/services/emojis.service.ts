import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable()

export class EmojisService{
    // Création d'un BehaviourSubject pour gérer l'affichage du selecteur d'émotes.
    private showEmojisListSubject = new BehaviorSubject<boolean>(false);
    showEmojisList$ = this.showEmojisListSubject.asObservable();

    // Tableau pour exclure des catégories dans le selecteur d'émotes
    categoryExcluded(): [string] {
        return ["flags"]
    }

    // A partir de l'event déclenché au clic sur un émoji, on retourne l'émoji selectionné sous forme de string.
    loadEmojisFromEvent(event: any): string{
        return event.emoji.native
    }

    // A partir de l'event déclenché au clic sur un émoji, on ajoute cet émoji dans le message.
    addEmojisToMessage(event: any, message: string): string{
        const emoji = this.loadEmojisFromEvent(event)
        return message += emoji
    }

    // Variable pour gérer l'ouverture et la fermeture du selecteur d'émojis.
    openEmojisList(showEmojisList: boolean): boolean{
        return !showEmojisList
    }



}