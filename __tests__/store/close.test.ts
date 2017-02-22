import { remove } from 'fs-promise';

import * as key from 'key';
import { init } from 'lib/init';
import * as store from 'store';

describe('store -> close', () => {
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

  test('writes given data to the store', async () => {
    try {

      const teststore = await store.open();

      teststore.set('facebook', 'facebook_pass');
      await store.close(teststore);

      expect((await store.open()).has('facebook')).toBeTruthy();
      expect((await store.open()).get('facebook')).toBe('facebook_pass');

      teststore.set('gmail', 'gmail_pass');
      await store.close(teststore);

      expect((await store.open()).has('facebook')).toBeTruthy();
      expect((await store.open()).has('gmail')).toBeTruthy();
      expect((await store.open()).get('facebook')).toBe('facebook_pass');
      expect((await store.open()).get('gmail')).toBe('gmail_pass');

    } catch (e) {
      throw e;
    }
  });
});
