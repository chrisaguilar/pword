import * as s from '..';
import { setup } from '../../lib';
import { b, green, r, red } from '../../lib/formatters';

describe('store -> add', () => {
  test('saves new password to store', async () => {
    try {
      await setup.before();

      const store = await s.open();

      store.set('gmail', 'abc123');
      await s.close(store);
      expect(await s.open()).toEqual(store);

      const added = await s.add('facebook', '123abc');
      store.set('facebook', '123abc');
      expect(await s.open()).toEqual(store);

      expect(added).toEqual(`${b}${green}facebook${r} set to ${b}${green}123abc${r}`);

      await setup.after();
    } catch (e) {
      expect(e).toBeNull();
    }
  });

  test('rejects names already present', async () => {
    try {
      await setup.before();

      const store = await s.open();

      store.set('gmail', 'abc123');
      await s.close(store);
      expect(await s.open()).toEqual(store);

      const rejected = await s.add('gmail', '123abc');
      store.set('gmail', '123abc');
      expect(await s.open()).not.toEqual(store);
      expect(rejected).toEqual(`${b}${red}gmail already present in store${r}`);

      await setup.after();
    } catch (e) {
      expect(e).toBeNull();
    }
  });
});
