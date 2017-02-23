import { remove, writeFile } from 'fs-promise';

import * as k from '..';
import { rand, setup } from '../../lib';

describe('key -> open', () => {
  test('opens the key file', async () => {
    try {
      await setup.before();

      await remove(k.file);
      await writeFile(k.file, await rand(24), 'hex');

      const testkey: string = await k.open();
      expect(testkey.length).toEqual(24);

      await setup.after();
    } catch (e) {
      expect(e).toBeNull();
    }
  });
});
