import { randomBytes as rand } from 'crypto';
import {
  readFileSync as read, removeSync as remove, writeFileSync as write
} from 'fs-extra';
import { resolve } from 'path';

import get from '../get';
import keyfile from '../location';

describe('key -> get', () => {
  beforeAll(
    () => write(keyfile, rand(2000000).toString('hex'), 'utf8')
  );
  afterAll(
    () => remove(keyfile)
  );
  test(
    'gets key from key file',
    () => expect(read(keyfile, 'utf8').length).toEqual(4000000)
  );
});
