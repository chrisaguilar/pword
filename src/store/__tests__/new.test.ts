import { destroy, initialize } from '.';
import { close, newpass, open } from '..';
import { b, green, r, red } from '../../lib/formatters';

describe('store -> new', () => {
  beforeAll(async () => initialize());
  afterAll(async () => destroy());

  test('saves a new, randomly-generated password of a given length to the store', async () => {
    try {

      await newpass(10, 'trello');
      expect(((await open()).get('trello') as string).length).toBe(10);

      await newpass(50, 'wikipedia');
      expect(((await open()).get('wikipedia') as string).length).toBe(50);

    } catch (e) {
      throw e;
    }
  });

  test('alerts the user if the specified name already exists in the store', async () => {
    try {

      await newpass(10, 'Steam');
      expect(await newpass(10, 'Steam')).toBe(`${b}${red}Steam already present in store${r}`);

    } catch (e) {
      throw e;
    }
  });
});
