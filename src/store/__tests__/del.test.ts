import { destroy, initialize } from '.';
import { close, del, open } from '..';

describe('store -> del', () => {
  beforeAll(async () => await initialize());
  afterAll(async () => await destroy());

  test('deletes items from the store', async () => {
    try {
      const store = await open();

      store.set('gmail', 'abc123');
      await close(store);
      expect(await open()).toEqual(store);

      store.set('facebook', '123abc');
      await close(store);
      expect(await open()).toEqual(store);

      await del('facebook');
      store.delete('facebook');
      expect(await open()).toEqual(store);
    } catch (e) {
      throw e;
    }
  });
});
