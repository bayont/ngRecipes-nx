import { TextStyleParser } from './text-style.parser';

export class HighlightTextStyleParser extends TextStyleParser {
  delimiter = '*';

  getHtmlStyling(insideValue: string): string {
    return `<span class='highlight-text'>${insideValue}</span>`;
  }
}
