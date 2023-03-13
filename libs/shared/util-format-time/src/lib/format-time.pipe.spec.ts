import { FormatTimePipe } from './format-time.pipe';

describe('FormatTimePipe', () => {
  it('create an instance', () => {
    const formatTimePipe = new FormatTimePipe();
    expect(formatTimePipe).toBeTruthy();
  });

  it('should tranform time properly', () => {
    const formatTimePipe = new FormatTimePipe();
    const tests: Array<{ minutes: number; expectedResult: string }> = [
      {
        minutes: 20,
        expectedResult: '0h 20m',
      },
      {
        minutes: 60,
        expectedResult: '1h 0m',
      },
      {
        minutes: 190,
        expectedResult: '3h 10m',
      },
    ];

    for (const test of tests) {
      expect(formatTimePipe.transform(test.minutes)).toEqual(
        test.expectedResult
      );
    }
  });
});
