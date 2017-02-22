import { resolve } from 'path';

import { file } from 'key';

describe('key -> file', () => {
  test('should be a string', () => expect(typeof file).toBe('string'));
  const path: string = resolve(__dirname, '../../key');
  test('should point to the correct directory', () => expect(path).toBe(file));
});
