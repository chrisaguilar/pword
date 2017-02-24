import * as s from '..';
import { setup } from '../../lib';
import { b, green, r, red } from '../../lib/formatters';

describe('store -> find', () => {
  test('finds passwords that match a given RegEx', async () => {
    try {
      await setup.before();

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

      await setup.after();
    } catch (e) {
      expect(e).toBeNull();
    }
  });

  test('alerts the user if no items match the RegEx', async () => {
    try {
      await setup.before();

      expect(await s.find('youtube')).toEqual(`${b}${red}No matches found for youtube${r}`);

      await setup.after();
    } catch (e) {
      expect(e).toBeNull();
    }
  });
});
