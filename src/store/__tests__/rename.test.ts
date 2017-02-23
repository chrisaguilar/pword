import { destroy, initialize } from '.';
import { close, open, rename } from '..';
import { b, green, r, red } from '../../lib/formatters';

describe('store -> rename', () => {
  beforeAll(async () => initialize());
  afterAll(async () => destroy());

  test('renames an item', async () => {
    try {

      const store = await open();
      store.set('facebook', 'abc123');
      await close(store);

      await rename('facebook', 'fb');
      expect(await open()).not.toEqual(store);

      store.set('fb', store.get('facebook'));
      store.delete('facebook');

      expect((await open()).entries()).toEqual(store.entries());

      expect(await rename('fb', 'gmail')).toEqual(`Renamed ${b}${green}fb${r} to ${b}${green}gmail${r}`);

    } catch (e) {
      return console.error(e) as any;
    }
  });

  test('alerts the user if the item is not present in the store', async () => {
    try {

      expect(await rename('reddit', 'alienblue')).toEqual(`${b}${red}reddit not present in store${r}`);

    } catch (e) {
      return console.error(e) as any;
    }
  });
});
