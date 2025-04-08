import { Injectable } from "@angular/core";
import { ChipService } from "./chip.service";

@Injectable()

export class FormCreateGroupMessage {
    constructor(private chipService : ChipService) {}

    createFormDataToSend(): void{
        
    }
}