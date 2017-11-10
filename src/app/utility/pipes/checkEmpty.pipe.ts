import {Pipe, PipeTransform} from "@angular/core";

@Pipe({name: 'checkEmpty'})
export class CheckEmpty implements PipeTransform {
  transform(value: any): string {
    if (value == "" || value == null) {
      return '-'
    } else {
      return value
    }
  }
}
