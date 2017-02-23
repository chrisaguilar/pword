import { remove } from 'fs-promise';

import * as k from 'key';
import * as s from 'store';
import * as setup from '../setup';

describe('store -> decrypt', () => {
  let encA: any;
  let encB: any;
  let decA: any;
  let decB: any;

  test('returns a new map', async () => {
    try {
      await setup.before();

      decA = await s.decrypt(encA);
      decB = await s.decrypt(encB);
      expect(decA).toBeInstanceOf(Map);
      expect(decA.size).toBe(0);
      expect(decB).toBeInstanceOf(Map);
      expect(decB.size).toBe(1);

      await setup.after();
    } catch (e) {
      expect(e).toBeNull();
    }
  });

  test('properly decrypts data', async () => {
    try {
      await setup.before();

      decA = await s.decrypt(encA);
      decB = await s.decrypt(encB);
      expect(decA.entries().next().value).toBeUndefined();
      expect(decB.entries().next().value).toEqual([ 'gmail', 'abc123' ]);

      await setup.after();
    } catch (e) {
      expect(e).toBeNull();
    }
  });
});
