import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nameToAvatar'
})
export class NameToAvatarPipe implements PipeTransform {

  transform(value: string, args?: any): any {
    if (typeof value === 'undefined' || value === '') {
      return;
    }
    if (args) {
      return value;
    }
    return value[0].toUpperCase();
  }

}
