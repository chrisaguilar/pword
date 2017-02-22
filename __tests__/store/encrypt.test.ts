import { remove } from 'fs-promise';
import { create as createKey, file as key } from 'key';
import { encrypt } from 'store';

describe('store -> encrypt', () => {
  test('returns data', async () => {
    try {
      await createKey();
      const a = await encrypt(new Map());
      const b = await encrypt(new Map([ [ 'gmail', 'abc123' ] ]));
      expect(a.length).toBeGreaterThan(0);
      expect(b.length).toBeGreaterThan(0);
      await remove(key);
    } catch (e) {
      expect(e).toBeNull();
    }
  });
});
