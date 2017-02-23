import { remove } from 'fs-promise';

import * as k from 'key';
import { b, green, init, r, red } from 'lib';
import * as s from 'store';

describe('store -> new', () => {
  beforeAll(async () => {
    try {
      await init();
    } catch (e) {
      return console.error(e);
    }
  });

  afterAll(async () => {
    try {
      await remove(k.file);
      await remove(s.file);
    } catch (e) {
      return console.error(e);
    }
  });

  test('saves a new, randomly-generated password of a given length to the store', async () => {
    try {
      await s.new(10, 'trello');
      expect(((await s.open()).get('trello') as string).length).toBe(10);
      await s.new(50, 'wikipedia');
      expect(((await s.open()).get('wikipedia') as string).length).toBe(50);
    } catch (e) {
      expect(e).toBeNull();
    }
  });

  test('alerts the user if the specified name already exists in the store', async () => {
    try {
      await s.new(10, 'Steam');
      expect(await s.new(10, 'Steam')).toBe(`${b}${red}Steam already present in store${r}`);
    } catch (e) {
      expect(e).toBeNull();
    }
  });
});
