import { remove } from 'fs-promise';

import * as k from 'key';
import { b, green, init, r, red } from 'lib';
import * as s from 'store';


describe('store -> edit', () => {
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

  test('gives items new passwords', async () => {
    try {
      const store = await s.open();
      store.set('Outlook MaIl', 'abc123');
      store.set('gmail', 'gmailPass');
      store.set('facebook', 'notmymailpass');
      await s.close(store);
      const edited = await s.edit('facebook', 'newpass');
      store.set('facebook', 'newpass');
      expect(await s.open()).toEqual(store);
      expect(edited).toEqual(`${b}${green}facebook${r} set to ${b}${green}newpass${r}`);
    } catch (e) {
      expect(e).toBeNull();
    }
  });

  test('alerts user if the item does not exist in the store', async () => {
    try {
      const rejected = await s.edit('whatwhat', 'bzxcnbvxnvc');
      expect(rejected).toEqual(`${b}${red}whatwhat not in the store${r}`);
    } catch (e) {
      expect(e).toBeNull();
    }
  });
});
