import { resolve } from 'path';

import * as k from 'key';

describe('key -> file', () => {
  test('should be a string', () => expect(typeof k.file).toBe('string'));

  const path = resolve(__dirname, '../../key');
  test('should point to the correct directory', () => expect(path).toBe(k.file));
});
