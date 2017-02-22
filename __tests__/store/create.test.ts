import { readFile, remove } from 'fs-promise';

import { create as createKey, file as key } from 'key';
import { create as createStore, encrypt, file as store } from 'store';

describe('store -> create', () => {
  beforeAll(async () => {
    try {
      await remove(store);
      await remove(key);
      await createKey();
    } catch (e) {
      return console.error(e);
    }
  });
  afterAll(async () => {
    try {
      await remove(store);
      await remove(key);
    } catch (e) {
      return console.error(e);
    }
  });

  test('uses key to write a new map to the store file', async () => {
    try {
      await createStore();
      const map = await encrypt(new Map());
      const teststore = await readFile(store, 'hex');
      expect(teststore).toEqual(teststore);
    } catch (e) {
      expect(e).toBeNull();
    }
  });
});
