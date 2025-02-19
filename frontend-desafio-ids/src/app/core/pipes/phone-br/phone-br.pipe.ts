/* eslint-disable class-methods-use-this */
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'phoneBr',
})
export default class PhoneBrPipe implements PipeTransform {
  transform(value: string): string {
    let newVal = value;

    if (!newVal) {
      return '';
    }

    let part1: string;

    if (newVal.length <= 10) {
      part1 = newVal.substr(0, 1);
      if (part1 === '*') {
        return newVal;
      }
      newVal = newVal.replace(/^(\d{0,2})(\d{0,4})(\d{0,4})/, '($1) $2-$3');
    } else {
      part1 = newVal.substr(0, 1);
      if (part1 === '*') {
        return newVal;
      }
      newVal = newVal.replace(
        /^(\d{0,2})(\d{0,1})(\d{0,4})(\d{0,4})/,
        '($1) $2 $3-$4',
      );
    }

    return newVal;
  }
}
