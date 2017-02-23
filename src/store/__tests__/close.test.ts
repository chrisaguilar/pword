import { destroy, initialize } from '.';
import { close, open } from '..';

describe('store -> close', () => {
  beforeAll(async () => await initialize());
  afterAll(async () => await destroy());

  test('writes given data to the store', async () => {
    try {

      const store = await open();

      store.set('facebook', 'facebook_pass');
      await close(store);

      expect((await open()).has('facebook')).toBeTruthy();
      expect((await open()).get('facebook')).toBe('facebook_pass');

      store.set('gmail', 'gmail_pass');
      await close(store);

      expect((await open()).has('facebook')).toBeTruthy();
      expect((await open()).has('gmail')).toBeTruthy();
      expect((await open()).get('facebook')).toBe('facebook_pass');
      expect((await open()).get('gmail')).toBe('gmail_pass');

    } catch (e) {
      return console.error(e) as any;
    }
  });
});
