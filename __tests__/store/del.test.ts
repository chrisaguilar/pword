import { remove } from 'fs-promise';

import * as k from 'key';
import { b, green, r, red } from 'lib/formatters';
import { init } from 'lib/init';
import * as s from 'store';

describe('store -> del', () => {
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

  test('deletes items from the store', async () => {
    try {
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
    } catch (e) {
      expect(e).toBeNull();
    }
  });

  test('alerts the user if an item is not present in the store', async () => {
    try {
      const rejected = await s.del('asdf');
      expect(rejected).toEqual(`${b}${red}asdf not in the store${r}`);
    } catch (e) {
      expect(e).toBeNull();
    }
  });
});
