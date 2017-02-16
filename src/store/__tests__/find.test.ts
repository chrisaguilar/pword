import { destroy, initialize } from '.';
import { close, find, open } from '..';

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

      const expected = [
        ...store.entries()
      ].filter(([ a, b ]) => /mail/i.test(a as string));

      expect(await find('mail')).toEqual(expected);
    } catch (e) {
      throw e;
    }
  });
});
