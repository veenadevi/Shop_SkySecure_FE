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
  name: 'safeurl'
})
export class SafeUrlPipe implements PipeTransform {

    constructor(
        public sanitizer: DomSanitizer
    ){}
  transform(value: any): any {
    if (value === '') {
      return '';
    }
    return this.sanitizer.bypassSecurityTrustResourceUrl(value);
  }
}