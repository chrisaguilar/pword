import * as s from '..';
import { setup } from '../../lib';
import { b, green, r, red } from '../../lib/formatters';


describe('store -> edit', () => {
  test('gives items new passwords', async () => {
    try {
      await setup.before();

      const store = await s.open();
      store.set('Outlook MaIl', 'abc123');
      store.set('gmail', 'gmailPass');
      store.set('facebook', 'notmymailpass');
      await s.close(store);

      const edited = await s.edit('facebook', 'newpass');
      store.set('facebook', 'newpass');

      expect(await s.open()).toEqual(store);
      expect(edited).toEqual(`${b}${green}facebook${r} set to ${b}${green}newpass${r}`);

      await setup.after();
    } catch (e) {
      expect(e).toBeNull();
    }
  });

  test('alerts user if the item does not exist in the store', async () => {
    try {
      await setup.before();

      const rejected = await s.edit('whatwhat', 'bzxcnbvxnvc');
      expect(rejected).toEqual(`${b}${red}whatwhat not in the store${r}`);

      await setup.after();
    } catch (e) {
      expect(e).toBeNull();
    }
  });
});
