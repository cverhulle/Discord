import { Injectable } from "@angular/core";

@Injectable()

export class EmojisService{
    categoryExcluded(): [string] {
        return ["flags"]
    }

    addEmojisToMessage(emoji: string, message: string): string{
        return message += emoji
    }
}