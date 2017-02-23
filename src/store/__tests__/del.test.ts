import { destroy, initialize } from '.';
import { close, del, open } from '..';
import { b, green, r, red } from '../../lib/formatters';

describe('store -> del', () => {
  beforeAll(async () => await initialize());
  afterAll(async () => await destroy());

  test('deletes items from the store', async () => {
    try {

      const store = await open();

      store.set('gmail', 'abc123');
      await close(store);
      expect(await open()).toEqual(store);

      store.set('facebook', '123abc');
      await close(store);
      expect(await open()).toEqual(store);

      const deleted = await del('facebook');
      store.delete('facebook');
      expect(await open()).toEqual(store);

      expect(deleted).toEqual(`Deleted ${b}${green}facebook${r} from the store`);

    } catch (e) {
      return console.error(e) as any;
    }
  });

  test('alerts the user if an item is not present in the store', async () => {
    try {

      const rejected = await del('asdf');
      expect(rejected).toEqual(`${b}${red}asdf not in the store${r}`);

    } catch (e) {
      return console.error(e) as any;
    }
  });
});
