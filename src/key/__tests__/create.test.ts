import { readFileSync as read, removeSync as remove } from 'fs-extra';
import { resolve } from 'path';

import create from '../create';
import keyfile from '../location';

describe('key -> create', () => {
  beforeAll(
    () => !remove(keyfile) && create()
  );
  afterAll(
    () => remove(keyfile)
  );
  test(
    'writes 4000000 random characters to a file',
    () => expect(read(keyfile, 'utf8').length).toBe(4000000)
  );
});
