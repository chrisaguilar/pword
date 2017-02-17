import { remove as rm, writeFile as write } from 'fs-promise';

import { keyfile, open } from '..';
import { rand } from '../../lib/rand';

describe('key -> open', () => {
  test('opens the key file', async () => {
    try {

      await rm(keyfile);
      await write(keyfile, await rand(24), 'hex');
      const key: string = await open();
      expect(key.length).toEqual(24);
      await rm(keyfile);

    } catch (e) {
      throw e;
    }
  });
});
