import { remove } from 'fs-promise';

import * as k from 'key';
import { b, green, init, r, red } from 'lib';
import * as s from 'store';

describe('store -> add', () => {
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

  test('saves new password to store', async () => {
    try {
      const teststore = await s.open();
      teststore.set('gmail', 'abc123');
      await s.close(teststore);
      expect(await s.open()).toEqual(teststore);
      const added = await s.add('facebook', '123abc');
      teststore.set('facebook', '123abc');
      expect(await s.open()).toEqual(teststore);
      expect(added).toEqual(`${b}${green}facebook${r} set to ${b}${green}123abc${r}`);
    } catch (e) {
      expect(e).toBeNull();
    }
  });

  test('rejects names already present', async () => {
    try {
      const teststore = await s.open();
      teststore.set('gmail', 'abc123');
      await s.close(teststore);
      expect(await s.open()).toEqual(teststore);
      const rejected = await s.add('gmail', '123abc');
      teststore.set('gmail', '123abc');
      expect(await s.open()).not.toEqual(teststore);
      expect(rejected).toEqual(`${b}${red}gmail already present in store${r}`);
    } catch (e) {
      expect(e).toBeNull();
    }
  });
});
