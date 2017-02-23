import { destroy, initialize } from '.';
import { close, find, open } from '..';
import { b, green, r, red } from '../../lib/formatters';

describe('store -> find', () => {
  beforeAll(async () => await initialize());
  afterAll(async () => await destroy());

  test('finds passwords that match a given RegEx', async () => {
    try {

      let store = await open();

      store.set('Outlook MaIl', 'abc123');
      store.set('gmail', 'gmailPass');
      store.set('facebook', 'notmymailpass');
      await close(store);

      const expected =
        [ ...store.entries() ]
          .filter(([ a, b ]) => /mail/i.test(a as string))
          .map(([ x, y ]) => `${b}${green}${x}${r}: ${y}`);

      expect(await find('mail')).toEqual(expected);

    } catch (e) {
      return console.error(e) as any;
    }
  });

  test('alerts the user if no items match the RegEx', async () => {
    try {

      expect(await find('youtube')).toEqual(`${b}${red}No matches found for youtube${r}`);

    } catch (e) {
      return console.error(e) as any;
    }
  });
});
