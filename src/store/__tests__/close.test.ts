import * as s from '..';
import { setup } from '../../lib';

describe('store -> close', () => {
  test('writes given data to the store', async () => {
    try {
      await setup.before();

      const store = await s.open();

      store.set('facebook', 'facebook_pass');
      await s.close(store);

      expect((await s.open()).has('facebook')).toBeTruthy();
      expect((await s.open()).get('facebook')).toBe('facebook_pass');

      store.set('gmail', 'gmail_pass');
      await s.close(store);

      const newstore = await s.open();
      expect(newstore.has('facebook')).toBeTruthy();
      expect(newstore.has('gmail')).toBeTruthy();
      expect(newstore.get('facebook')).toBe('facebook_pass');
      expect(newstore.get('gmail')).toBe('gmail_pass');

      await setup.after();
    } catch (e) {
      expect(e).toBeNull();
    }
  });
});
