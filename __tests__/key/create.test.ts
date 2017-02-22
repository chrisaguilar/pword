import { readFile, remove } from 'fs-promise';

import { create, file } from 'key';

describe('key -> create', () => {
  test('writes random characters to a file', async () => {
    try {
      await remove(file);
      await create();
      const key: string = await readFile(file, 'hex');
      expect(key.length).toBeGreaterThan(25);
      expect(key.length).toBeLessThan(100);
      await remove(file);
    } catch (e) {
      expect(e).toBeNull();
    }
  });
});
