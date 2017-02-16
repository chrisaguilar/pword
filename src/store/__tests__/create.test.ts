import { readFile as read } from 'fs-promise';

import { destroy, initialize } from '.';
import { encrypt, storefile } from '..';

describe('store -> create', () => {
  beforeAll(async () => await initialize());
  afterAll(async () => await destroy());

  test('uses key to write a new map to the store file', async () => {
    try {
      const map = await encrypt(new Map());
      const store = await read(storefile, 'hex');
      expect(map).toEqual(store);
    } catch (e) {
      throw e;
    }
  });
});
