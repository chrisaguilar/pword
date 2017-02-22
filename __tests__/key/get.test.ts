import { remove, writeFile } from 'fs-promise';

import { file, get } from 'key';
import { rand } from 'lib/rand';

describe('key -> open', () => {
  test('opens the key file', async () => {
    try {
      await remove(file);
      await writeFile(file, await rand(24), 'hex');
      const key: string = await get();
      expect(key.length).toEqual(24);
      await remove(file);
    } catch (e) {
      expect(e).toBeNull();
    }
  });
});
