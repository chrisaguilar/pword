import { readFile, remove } from 'fs-promise';

import * as key from 'key';
import { init } from 'lib/init';
import * as store from 'store';
import { encrypt } from 'store/encrypt';

describe('init', () => {
  afterAll(async () => {
    try {
      await remove(key.file);
      await remove(store.file);
    } catch (e) {
      return console.error(e);
    }
  });

  test('creates key and store', async () => {
    try {
      await init();

      const teststore = await(encrypt(new Map()));

      const keyfile: string = await readFile(key.file, 'hex');
      const storefile: string = await readFile(store.file, 'hex');

      expect(keyfile).toBeTruthy();
      expect(typeof keyfile).toBe('string');
      expect(keyfile.length).toBeGreaterThanOrEqual(24);
      expect(keyfile.length).toBeLessThan(100);

      expect(storefile).toBeTruthy();
      expect(typeof storefile).toBe('string');
      expect(storefile.length).toBe(teststore.length);
      expect(storefile).toBe(teststore);
    } catch (e) {
      expect(e).toBeNull();
    }
  });
});
