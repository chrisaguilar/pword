import * as s from '..';
import { setup } from '../../lib';
import { b, green, r, red } from '../../lib/formatters';

describe('store -> del', () => {
  test('deletes items from the store', async () => {
    try {
      await setup.before();

      const store = await s.open();

      store.set('gmail', 'abc123');
      await s.close(store);
      expect(await s.open()).toEqual(store);

      store.set('facebook', '123abc');
      await s.close(store);
      expect(await s.open()).toEqual(store);

      const deleted = await s.del('facebook');
      store.delete('facebook');
      expect(await s.open()).toEqual(store);

      expect(deleted).toEqual(`Deleted ${b}${green}facebook${r} from the store`);

      await setup.after();
    } catch (e) {
      expect(e).toBeNull();
    }
  });

  test('alerts the user if an item is not present in the store', async () => {
    try {
      await setup.before();

      const rejected = await s.del('asdf');
      expect(rejected).toEqual(`${b}${red}asdf not in the store${r}`);

      await setup.after();
    } catch (e) {
      expect(e).toBeNull();
    }
  });
});
