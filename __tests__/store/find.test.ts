import { remove } from 'fs-promise';

import * as k from 'key';
import { b, green, init, r, red } from 'lib';
import * as s from 'store';

describe('store -> find', () => {
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

  test('finds passwords that match a given RegEx', async () => {
    try {
      let store = await s.open();
      store.set('Outlook MaIl', 'abc123');
      store.set('gmail', 'gmailPass');
      store.set('facebook', 'notmymailpass');
      await s.close(store);
      const expected =
        [ ...store.entries() ]
          .filter(([ a, b ]) => /mail/i.test(a as string))
          .map(([ x, y ]) => `${b}${green}${x}${r}: ${y}`);
      expect(await s.find('mail')).toEqual(expected);

    } catch (e) {
      expect(e).toBeNull();
    }
  });

  test('alerts the user if no items match the RegEx', async () => {
    try {
      expect(await s.find('youtube')).toEqual(`${b}${red}No matches found for youtube${r}`);
    } catch (e) {
      expect(e).toBeNull();
    }
  });
});
