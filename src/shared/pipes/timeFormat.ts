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
  name: 'timeFormat'
})
export class TimeFormatPipe implements PipeTransform {

    constructor(
        
    ){}
  transform(value: any): any {
    if (value === '') {
      return '';
    }

    var date = new  Date (value);

    var todayDate = new Date();
    


    let time1:any = date.getHours();
    let time2:any = todayDate.getHours();
  
    return date;
  }
}