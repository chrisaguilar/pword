import * as s from '..';
import { setup } from '../../lib';


describe('store -> open', () => {
  test('opens & decrypts store file', async () => {
    try {
      await setup.before();

      const store = await s.open();
      expect(store).toBeTruthy();
      expect(store.size).toBe(0);
      expect(store.entries().next().value).toBeUndefined();

      await setup.after();
    } catch (e) {
      expect(e).toBeNull();
    }
  });
});
