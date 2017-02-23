import { remove, writeFile } from 'fs-promise';

import * as k from 'key';
import { rand } from 'lib';
import * as setup from '../setup';

describe('key -> open', () => {
  test('opens the key file', async () => {
    try {
      await setup.before();

      await writeFile(k.file, await rand(24), 'hex');
      const key = await k.get();
      expect(key.length).toEqual(24);

      await setup.after();
    } catch (e) {
      expect(e).toBeNull();
    }
  });
});
