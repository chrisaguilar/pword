import * as s from '..';
import { setup } from '../../lib';

describe('store -> decrypt', () => {
  test('decrypts data', async () => {
    try {
      await setup.before();
      let encA = await s.encrypt(new Map());
      let encB = await s.encrypt(new Map([ [ 'gmail', 'abc123' ] ]));
      let decA = await s.decrypt(encA);
      let decB = await s.decrypt(encB);

      expect(decA).toBeInstanceOf(Map);
      expect(decA.size).toBe(0);
      expect(decB).toBeInstanceOf(Map);
      expect(decB.size).toBe(1);
      expect(decA.entries().next().value).toBeUndefined();
      expect(decB.entries().next().value).toEqual([ 'gmail', 'abc123' ]);

      await setup.after();
    } catch (e) {
      expect(e).toBeNull();
    }
  });
});
