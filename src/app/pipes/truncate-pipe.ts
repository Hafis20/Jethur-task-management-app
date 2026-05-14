import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate',
})
export class TruncatePipe implements PipeTransform {
  transform(value: string): string {

    const strLength = value.length;

    if (strLength > 0 && strLength < 50) {
      return value;
    }
    return `${value.slice(0, 50)}...`;
  }
}
