import { DomSanitizer } from '@angular/platform-browser';
import { createPipeFactory, mockProvider } from '@ngneat/spectator/jest';
import { TextStylePipe } from './text-style.pipe';

describe('TextStylePipe', () => {
  const createPipe = createPipeFactory(TextStylePipe);
  const testSetup = (template: string) => {
    const spectator = createPipe(template, {
      providers: [
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        mockProvider(DomSanitizer, {
          bypassSecurityTrustHtml: jest.fn((value) => value),
        }),
      ],
    });
    const domSanitizer = spectator.inject(DomSanitizer);

    return { spectator, domSanitizer };
  };

  it('create an instance', () => {
    const { spectator } = testSetup('{{ "text" | textStyle }}');
    expect(spectator.element).toBeTruthy();
  });

  it('should render highlighted text', () => {
    const { spectator, domSanitizer } = testSetup(
      '{{ "This *word* is highlighted" | textStyle }}'
    );
    expect(spectator.element).toHaveText(
      `This <span class='highlight-text'>word</span> is highlighted`
    );
    expect(domSanitizer.bypassSecurityTrustHtml).toBeCalledWith(
      `This <span class='highlight-text'>word</span> is highlighted`
    );
  });
});
