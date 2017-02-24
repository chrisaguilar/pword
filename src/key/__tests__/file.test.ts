import { homedir } from 'os';
import { resolve } from 'path';

import * as k from '..';

describe('key -> file', () => {
  test('should be a string', () => expect(typeof k.file).toBe('string'));

  const path = resolve(homedir(), '.pword/key');
  test('should point to the correct location', () => expect(path).toEqual(k.file));
});
