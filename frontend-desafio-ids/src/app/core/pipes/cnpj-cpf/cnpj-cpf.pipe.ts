/* eslint-disable class-methods-use-this */
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cnpjCpf',
})
export default class CnpjCpfPipe implements PipeTransform {
  transform(value: any): string {
    if (!value) return value;
    if (value === '*') {
      return value;
    }
    let part1: string;
    let part2: string;
    let part3: string;
    let part4: string;

    if (value.length <= 11) {
      part1 = value.substr(0, 3);
      part2 = value.substr(3, 3);
      part3 = value.substr(6, 3);
      part4 = value.substr(9, 2);

      // 999.999.999-99
      if (part1 === '***') {
        return value;
      }
      return `${part1}.${part2}.${part3}-${part4}`;
    }
    part1 = value.substr(0, 2);
    if (part1 === '**') {
      return value;
    }
    part2 = value.substr(2, 3);
    part3 = value.substr(5, 3);
    part4 = value.substr(8, 4);
    const part5 = value.substr(12, 2);

    return `${part1}.${part2}.${part3}/${part4}-${part5}`;
  }
}
