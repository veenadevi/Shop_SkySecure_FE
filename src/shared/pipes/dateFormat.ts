import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

/*
 * Usage:
 *   value | paren
 * Example:
 *   {{ 'foo' | paren }}
 *   formats to: '（foo）'
*/
@Pipe({
  name: 'dateFormat'
})
export class DateFormatPipe implements PipeTransform {

    constructor(
        
    ){}
  transform(value: any): any {
    if (value === '') {
      return '';
    }

    var date = new  Date (value);
    //console.log(date.toDateString());

    return date.getDate() + '-' + date.getMonth() + '-' + date.getFullYear();
    //return date;
  }
}