export abstract class TextStyleParser {
  abstract delimiter: string;

  abstract getHtmlStyling(insideValue: string): string;

  private regex(): RegExp {
    return new RegExp(
      `\\${this.delimiter}[^${this.delimiter}]+\\${this.delimiter}`,
      'g'
    );
  }
  private trimDelimiters(text: string): string {
    return text.slice(
      this.delimiter.length,
      text.length - this.delimiter.length
    );
  }

  public parse(text: string): string {
    const textsToReplace = text.match(this.regex());
    textsToReplace?.forEach((textToReplace) => {
      text = text.replace(
        textToReplace,
        this.getHtmlStyling(this.trimDelimiters(textToReplace))
      );
    });
    return text;
  }
}
