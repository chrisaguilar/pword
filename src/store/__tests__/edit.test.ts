import { destroy, initialize } from '.';
import { close, edit, open } from '..';
import { b, green, r, red } from '../../lib/formatters';


describe('store -> edit', () => {
  beforeAll(async () => await initialize());
  afterAll(async () => await destroy());

  test('gives items new passwords', async () => {
    try {

      const store = await open();
      store.set('Outlook MaIl', 'abc123');
      store.set('gmail', 'gmailPass');
      store.set('facebook', 'notmymailpass');
      await close(store);

      const edited = await edit('facebook', 'newpass');
      store.set('facebook', 'newpass');

      expect(await open()).toEqual(store);
      expect(edited).toEqual(`${b}${green}facebook${r} set to ${b}${green}newpass${r}`);

    } catch (e) {
      throw e;
    }
  });

  test('alerts user if the item does not exist in the store', async () => {
    try {

      const rejected = await edit('whatwhat', 'bzxcnbvxnvc');
      expect(rejected).toEqual(`${b}${red}whatwhat not in the store${r}`);

    } catch (e) {
      throw e;
    }
  });
});
