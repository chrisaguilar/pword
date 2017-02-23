import { readFile } from 'fs-promise';

import * as k from 'key';
import * as setup from '../setup';

describe('key -> create', () => {
  test('writes random characters to a file', async () => {
    try {
      await setup.before();

      await k.create();
      const key = await readFile(k.file, 'hex');
      expect(key.length).toBeGreaterThanOrEqual(24);
      expect(key.length).toBeLessThan(100);

      await setup.after();
    } catch (e) {
      expect(e).toBeNull();
    }
  });
});
