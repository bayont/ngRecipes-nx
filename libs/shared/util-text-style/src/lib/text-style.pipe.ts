import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { HighlightTextStyleParser } from './parsers/highlight.parser';
import { TextStyleParser } from './parsers/text-style.parser';

@Pipe({
  name: 'textStyle',
})
export class TextStylePipe implements PipeTransform {
  private readonly parsers: TextStyleParser[] = [
    new HighlightTextStyleParser(),
  ];
  constructor(private readonly domSanitizer: DomSanitizer) {}

  transform(value: string): SafeHtml {
    let parsedString = value;
    for (const parser of this.parsers) {
      parsedString = parser.parse(parsedString);
    }
    return this.domSanitizer.bypassSecurityTrustHtml(parsedString);
  }
}
