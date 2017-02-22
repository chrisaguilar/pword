import { resolve } from 'path';

import { file } from 'store';

describe('store -> file', () => {
  test('should be a string', () => expect(typeof file).toBe('string'));
  const path = resolve(__dirname, '../../store');
  test('should point to the correct directory', () => expect(path).toBe(file));
});
