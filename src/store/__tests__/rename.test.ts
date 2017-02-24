import * as s from '..';
import { setup } from '../../lib';
import { b, green, r, red } from '../../lib/formatters';

describe('store -> rename', () => {
  test('renames an item', async () => {
    try {
      await setup.before();

      const store = await s.open();
      store.set('facebook', 'abc123');
      await s.close(store);

      await s.rename('facebook', 'fb');
      expect(await s.open()).not.toEqual(store);

      store.set('fb', store.get('facebook'));
      store.delete('facebook');

      expect((await s.open()).entries()).toEqual(store.entries());

      expect(await s.rename('fb', 'gmail')).toEqual(`Renamed ${b}${green}fb${r} to ${b}${green}gmail${r}`);

      await setup.after();
    } catch (e) {
      expect(e).toBeNull();
    }
  });

  test('alerts the user if the item is not present in the store', async () => {
    try {
      await setup.before();

      expect(await s.rename('reddit', 'alienblue')).toEqual(`${b}${red}reddit not present in store${r}`);

      await setup.after();
    } catch (e) {
      expect(e).toBeNull();
    }
  });
});
