import { readFile } from 'fs-promise';

import * as s from '..';
import { setup } from '../../lib';

describe('store -> create', () => {
  test('uses key to write a new map to the store file', async () => {
    try {
      await setup.before();

      const map = await s.encrypt(new Map());
      const store = await readFile(s.file, 'hex');
      expect(map).toEqual(store);

      await setup.after();
    } catch (e) {
      expect(e).toBeNull();
    }
  });
});
