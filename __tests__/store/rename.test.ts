import { remove } from 'fs-promise';

import * as k from 'key';
import { b, green, r, red } from 'lib/formatters';
import { init } from 'lib/init';
import * as s from 'store';

describe('store -> rename', () => {
beforeAll(async () => {
    try {
      await init();
    } catch (e) {
      return console.error(e);
    }
  });

  afterAll(async () => {
    try {
      await remove(k.file);
      await remove(s.file);
    } catch (e) {
      return console.error(e);
    }
  });

  test('renames an item', async () => {
    try {
      const store = await s.open();
      store.set('facebook', 'abc123');
      await s.close(store);
      await s.rename('facebook', 'fb');
      expect(await s.open()).not.toEqual(store);
      store.set('fb', store.get('facebook'));
      store.delete('facebook');
      expect((await s.open()).entries()).toEqual(store.entries());
      expect(await s.rename('fb', 'gmail')).toEqual(`Renamed ${b}${green}fb${r} to ${b}${green}gmail${r}`);
    } catch (e) {
      expect(e).toBeNull();
    }
  });

  test('alerts the user if the item is not present in the store', async () => {
    try {
      expect(await s.rename('reddit', 'alienblue')).toEqual(`${b}${red}reddit not present in store${r}`);
    } catch (e) {
      expect(e).toBeNull();
    }
  });
});
