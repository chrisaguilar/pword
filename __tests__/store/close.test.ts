import { remove } from 'fs-promise';

import * as k from 'key';
import { init } from 'lib';
import * as s from 'store';

describe('store -> close', () => {
  test('writes given data to the store', async () => {
    try {
      await init();
      const teststore = await s.open();
      teststore.set('facebook', 'facebook_pass');
      await s.close(teststore);
      expect((await s.open()).has('facebook')).toBeTruthy();
      expect((await s.open()).get('facebook')).toBe('facebook_pass');
      teststore.set('gmail', 'gmail_pass');
      await s.close(teststore);
      expect((await s.open()).has('facebook')).toBeTruthy();
      expect((await s.open()).has('gmail')).toBeTruthy();
      expect((await s.open()).get('facebook')).toBe('facebook_pass');
      expect((await s.open()).get('gmail')).toBe('gmail_pass');
      remove(k.file);
      remove(s.file);
    } catch (e) {
      expect(e).toBeNull();
    }
  });
});
