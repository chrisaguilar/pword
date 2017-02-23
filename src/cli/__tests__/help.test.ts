import { help } from '..';

describe('help', () => {
  test('should return data', () => {
    expect(help()).toBeDefined();
    expect(help()).toBeTruthy();
  });
  test('should return a string', () => {
    expect(typeof help()).toBe('string');
    expect(help().length).toBeGreaterThan(0);
  });
});
