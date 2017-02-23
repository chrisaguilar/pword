import { remove } from 'fs-promise';

import * as key from 'key';
import { init } from 'lib';
import * as store from 'store';

describe('store -> open', () => {
  beforeAll(async () => {
    try {
      await init();
    } catch (e) {
      return console.error(e);
    }
  });

  afterAll(async () => {
    try {
      await remove(key.file);
      await remove(store.file);
    } catch (e) {
      return console.error(e);
    }
  });

  test('opens & decrypts store file', async () => {
    try {
      const teststore = await store.open();
      expect(teststore).toBeTruthy();
      expect(teststore.size).toBe(0);
      expect(teststore.entries().next().value).toBeUndefined();
    } catch (e) {
      expect(e).toBeNull();
    }
  });
});
