import { resolve } from 'path';

import * as k from '..';

describe('key -> file', () => {
  test('should be a string', () => expect(typeof k.file).toBe('string'));

  const path = resolve(__dirname, '../../../key');
  test('should point to the correct location', () => expect(path).toEqual(k.file));
});
