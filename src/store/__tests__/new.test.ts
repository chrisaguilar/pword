import * as s from '..';
import { setup } from '../../lib';
import { b, green, r, red } from '../../lib/formatters';

describe('store -> new', () => {
  test('saves a new, randomly-generated password of a given length to the store', async () => {
    try {
      await setup.before();

      await s.new(10, 'trello');
      expect(((await s.open()).get('trello') as string).length).toBe(10);

      await s.new(50, 'wikipedia');
      expect(((await s.open()).get('wikipedia') as string).length).toBe(50);

      await setup.after();
    } catch (e) {
      expect(e).toBeNull();
    }
  });

  test('alerts the user if the specified name already exists in the store', async () => {
    try {
      await setup.before();

      await s.new(10, 'Steam');
      expect(await s.new(10, 'Steam')).toBe(`${b}${red}Steam already present in store${r}`);

      await setup.after();
    } catch (e) {
      expect(e).toBeNull();
    }
  });
});
