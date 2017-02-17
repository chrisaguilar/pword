import { destroy, initialize } from '.';
import { close, get, open } from '..';
import { b, green, r, red } from '../../lib/formatters';

describe('store -> get', () => {
  beforeAll(async () => await initialize());
  afterAll(async () => await destroy());

  test('gets specified password from store', async () => {
    try {

      const store = await open();
      store.set('facebook', 'abc123');
      store.set('gmail', 'gmailPass');
      await close(store);

      expect(await get('facebook')).toEqual(`${b}${green}facebook${r}: abc123`);
      expect(await get('gmail')).toEqual(`${b}${green}gmail${r}: gmailPass`);

    } catch (e) {
      throw e;
    }
  });

  test('specified password does not exist', async () => {
    try {

      expect(await get('youtube')).toEqual(`${b}${red}youtube does not exist in store${r}`);

    } catch (e) {
      throw e;
    }
  });
});
