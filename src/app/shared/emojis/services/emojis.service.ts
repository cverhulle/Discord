import { Injectable } from "@angular/core";

@Injectable()

export class EmojisService{
    categoryExcluded(): [string] {
        return ["flags"]
    }

    loadEmojisFromEvent(event: any): string{
        return event.emoji.native
    }

    addEmojisToMessage(event: any, message: string): string{
        const emoji = this.loadEmojisFromEvent(event)
        return message += emoji
    }



}