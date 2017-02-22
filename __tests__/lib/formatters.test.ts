import * as fmt from 'lib/formatters';

describe('lib -> formatters', () => {
  test('b should be a string', () => expect(typeof fmt.b).toBe('string'));
  test('cols should be a number', () => expect(!isNaN(fmt.cols)).toBeTruthy());
  test('green should be a string', () => expect(typeof fmt.green).toBe('string'));
  test('hr should be a string', () => expect(typeof fmt.hr).toBe('string'));
  test('r should be a string', () => expect(typeof fmt.r).toBe('string'));
  test('red should be a string', () => expect(typeof fmt.red).toBe('string'));
});
