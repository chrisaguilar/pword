import {
  existsSync as exists,
  readFileSync as read,
  removeSync as remove,
  writeFileSync as write
} from 'fs-extra';
import { resolve } from 'path';

import key from '..';
import keyfile from '../location';

describe('key', () => {
  describe('key does not exist', () => {
    beforeEach(
      () => !remove(keyfile) && key()
    );
    afterAll(
      () => remove(keyfile)
    );
    test(
      'key is created',
      () => expect(exists(keyfile)).toBeTruthy()
    );
    test(
      'key is read',
      () => expect(read(keyfile, 'utf8').length).toEqual(4000000)
    );
  });
  describe('key exists', () => {
    beforeAll(
      () => key()
    );
    test(
      'key is not modified',
      () => {
        const old = read(keyfile, 'utf8');
        key();
        expect(read(keyfile, 'utf8')).toEqual(old);
      }
    );
    test(
      'key is read',
      () => expect(read(keyfile, 'utf8').length).toEqual(4000000)
    );
  });
});
