import { ensureFileSync as ensure, removeSync as remove } from 'fs-extra';
import { resolve } from 'path';

import check from '../check';
import keyfile from '../location';

describe('key -> check', () => {
  describe('key does not exist', () => {
    beforeAll(
      () => remove(keyfile)
    );
    test(
      'returns false',
      () => expect(check()).toBeFalsy()
    );
  });

  describe('key exists', () => {
    beforeAll(
      () => ensure(keyfile)
    );
    afterAll(
      () => remove(keyfile)
    );
    test(
      'returns true',
      () => expect(check()).toBeTruthy()
    );
  });
});
