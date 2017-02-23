import { destroy, initialize } from '.';
import { open } from '..';

describe('store -> open', () => {
  beforeAll(async () => await initialize());
  afterAll(async () => await destroy());

  test('opens & decrypts store file', async () => {
    try {

      const store = await open();
      expect(store).toBeTruthy();
      expect(store.size).toBe(0);
      expect(store.entries().next().value).toBeUndefined();

    } catch (e) {
      throw e;
    }
  });
});
