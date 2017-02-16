import { destroy, initialize } from '.';
import { close, get, open } from '..';

describe('store -> get', () => {
  beforeAll(async () => await initialize());
  afterAll(async () => await destroy());

  test('gets specified password from store', async () => {
    try {
      const store = await open();
      store.set('facebook', 'abc123');
      store.set('gmail', 'gmailPass');
      await close(store);

      expect(await get('facebook')).toBe('abc123');
      expect(await get('gmail')).toBe('gmailPass');
    } catch (e) {
      throw e;
    }
  });
});
