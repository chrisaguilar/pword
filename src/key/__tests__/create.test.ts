import { readFile, remove } from 'fs-promise';

import * as k from '..';
import { setup } from '../../lib';

describe('key -> create', () => {
  test('writes 25..100 random characters to a file', async () => {
    try {
      await setup.before();

      await remove(k.file);
      await k.create();
      const key: string = await readFile(k.file, 'hex');
      expect(key.length).toBeGreaterThanOrEqual(25);
      expect(key.length).toBeLessThan(100);

      await setup.after();
    } catch (e) {
      expect(e).toBeNull();
    }
  });
});
