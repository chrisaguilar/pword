import * as s from '..';
import { setup } from '../../lib';
import { b, green, r, red } from '../../lib/formatters';

describe('store -> get', () => {
  test('gets specified password from store', async () => {
    try {
      await setup.before();

      const store = await s.open();
      store.set('facebook', 'abc123');
      store.set('gmail', 'gmailPass');
      await s.close(store);

      expect(await s.get('facebook')).toEqual(`${b}${green}facebook${r}: abc123`);
      expect(await s.get('gmail')).toEqual(`${b}${green}gmail${r}: gmailPass`);

      await setup.after();
    } catch (e) {
      expect(e).toBeNull();
    }
  });

  test('specified password does not exist', async () => {
    try {
      await setup.before();

      expect(await s.get('youtube')).toEqual(`${b}${red}youtube does not exist in store${r}`);

      await setup.after();
    } catch (e) {
      expect(e).toBeNull();
    }
  });
});
