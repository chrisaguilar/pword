import { destroy, initialize } from '.';
import { close, edit, open } from '..';

describe('store -> edit', () => {
  beforeAll(async () => await initialize());
  afterAll(async () => await destroy());

  test('finds passwords that match a given RegEx', async () => {
      let store = await open();
      store.set('Outlook MaIl', 'abc123');
      store.set('gmail', 'gmailPass');
      store.set('facebook', 'notmymailpass');
      await close(store);

      await edit('facebook', 'newpass');
      store.set('facebook', 'newpass');

      expect(await open()).toEqual(store);
    }
  );
});
