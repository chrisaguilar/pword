import { remove as rm, writeFile as write } from 'fs-promise';

import { keyfile, open, rand } from '..';

describe('key -> open', () => {
  test('opens the key file', async () => {
    try {
      await rm(keyfile);
      await write(keyfile, (await rand()).toString('hex'), 'hex');
      const key: string = await open();
      expect(key.length).toEqual(100);
      await rm(keyfile);
    } catch (e) {
      throw e;
    }
  });
});
