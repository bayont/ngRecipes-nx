import { TextStylePipe } from './text-style.pipe';
import { TestBed } from '@angular/core/testing';
import { DomSanitizer } from '@angular/platform-browser';

describe('TextStylePipe', () => {
  const mockDomSanitizer = {
    // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars
    bypassSecurityTrustHtml: (value: string) => {},
  };
  let domSanitizer: DomSanitizer;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TextStylePipe],
      providers: [{ provide: DomSanitizer, useValue: mockDomSanitizer }],
    }).compileComponents();
    domSanitizer = TestBed.inject(DomSanitizer);
  });

  it('create an instance', () => {
    const pipe = new TextStylePipe(domSanitizer);
    expect(pipe).toBeTruthy();
  });

  it('should render highlighted text', () => {
    const text = 'This *word* is highlighted';
    const textStylePipe = new TextStylePipe(domSanitizer);
    jest.spyOn(domSanitizer, 'bypassSecurityTrustHtml');

    textStylePipe.transform(text);
    expect(domSanitizer.bypassSecurityTrustHtml).toBeCalledWith(
      `This <span class='highlight-text'>word</span> is highlighted`
    );
  });
});
