import { homedir } from 'os';
import { resolve } from 'path';

import * as s from '..';

describe('store -> file', () => {
  test('should be a string', () => expect(typeof s.file).toBe('string'));

  const path = resolve(homedir(), '.pword/store');
  test('should point to the correct location', () => expect(path).toEqual(s.file));
});
