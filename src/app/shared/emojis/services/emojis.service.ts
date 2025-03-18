import { Injectable } from "@angular/core";

@Injectable()

export class EmojisService{
    categoryExcluded(): [string] {
        return ["flags"]
    }
}