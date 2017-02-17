import { readFile as read, remove as rm } from 'fs-promise';

import { create, keyfile } from '..';

describe('key -> create', () => {
  test('writes 24 random characters to a file', async () => {
    try {

      await rm(keyfile);
      await create();
      const key = await read(keyfile, 'hex');
      expect(key.length).toBe(24);
      await rm(keyfile);

    } catch (e) {
      throw e;
    }
  });
});
