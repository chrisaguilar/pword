import { remove } from 'fs-promise';

import * as key from 'key';
import { b, green, r, red } from 'lib/formatters';
import { init } from 'lib/init';
import * as store from 'store';

describe('store -> add', () => {
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

  test('saves new password to store', async () => {
    try {
      const teststore = await store.open();
      teststore.set('gmail', 'abc123');
      await store.close(teststore);
      expect(await store.open()).toEqual(teststore);
      const added = await store.add('facebook', '123abc');
      teststore.set('facebook', '123abc');
      expect(await store.open()).toEqual(teststore);
      expect(added).toEqual(`${b}${green}facebook${r} set to ${b}${green}123abc${r}`);
    } catch (e) {
      expect(e).toBeNull();
    }
  });

  test('rejects names already present', async () => {
    try {
      const teststore = await store.open();
      teststore.set('gmail', 'abc123');
      await store.close(teststore);
      expect(await store.open()).toEqual(teststore);
      const rejected = await store.add('gmail', '123abc');
      teststore.set('gmail', '123abc');
      expect(await store.open()).not.toEqual(teststore);
      expect(rejected).toEqual(`${b}${red}gmail already present in store${r}`);
    } catch (e) {
      expect(e).toBeNull();
    }
  });
});
