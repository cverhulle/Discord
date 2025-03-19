import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shorten'
})

// Ce pipe prend un maxLength en argument optionnel. Il permet de raccourcir la durée d'un texte.
export class ShortenPipe implements PipeTransform {
    transform(value: string, maxLength = 10): string {
        if (!value) {
            return '';
        }
        if (value.length <= maxLength) {
            return value;
        }
        return value.substring(0, maxLength) + '…';
    }
}
