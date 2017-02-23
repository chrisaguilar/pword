import { remove } from 'fs-promise';

import * as k from 'key';
import { b, green, r, red } from 'lib/formatters';
import { init } from 'lib/init';
import * as s from 'store';

describe('store -> get', () => {
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

  test('gets specified password from store', async () => {
    try {

      const store = await s.open();
      store.set('facebook', 'abc123');
      store.set('gmail', 'gmailPass');
      await s.close(store);
      expect(await s.get('facebook')).toEqual(`${b}${green}facebook${r}: abc123`);
      expect(await s.get('gmail')).toEqual(`${b}${green}gmail${r}: gmailPass`);
    } catch (e) {
      expect(e).toBeNull();
    }
  });

  test('specified password does not exist', async () => {
    try {
      expect(await s.get('youtube')).toEqual(`${b}${red}youtube does not exist in store${r}`);
    } catch (e) {
      expect(e).toBeNull();
    }
  });
});
