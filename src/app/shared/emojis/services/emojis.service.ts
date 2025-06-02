import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable()

// Ce service permet de gérer la roue des émojis.
export class EmojisService{
    // Création d'un BehaviourSubject pour gérer l'affichage du selecteur d'émotes.
    showEmojisListSubject = new BehaviorSubject<boolean>(false);
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
    openEmojisList(): void{
        const showEmojisList = this.showEmojisListSubject.getValue();
        this.showEmojisListSubject.next(!showEmojisList)
    }

    // Méthode pour remettre l'affichage des émojis par défaut (donc à false)
    resetEmojisDisplay(): void{
        this.showEmojisListSubject.next(false)
    }
}