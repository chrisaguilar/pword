import { remove } from 'fs-promise';

import { create as createKey, file as key } from 'key';
import { decrypt, encrypt } from 'store';

describe('store -> decrypt', () => {
  let encA: any;
  let encB: any;
  let decA: any;
  let decB: any;

  beforeAll(async () => {
    try {
      await createKey();
      encA = await encrypt(new Map());
      encB = await encrypt(new Map([ [ 'gmail', 'abc123' ] ]));
    } catch (e) {
      return console.error(e);
    }
  });

  afterAll(async () => {
    try {
      await remove(key);
    } catch (e) {
      return console.error(e);
    }
  });

  test('returns a new map', async () => {
    try {
      decA = await decrypt(encA);
      decB = await decrypt(encB);
      expect(decA).toBeInstanceOf(Map);
      expect(decA.size).toBe(0);
      expect(decB).toBeInstanceOf(Map);
      expect(decB.size).toBe(1);
    } catch (e) {
      expect(e).toBeNull();
    }
  });

  test('properly decrypts data', async () => {
    try {
      decA = await decrypt(encA);
      decB = await decrypt(encB);
      expect(decA.entries().next().value).toBeUndefined();
      expect(decB.entries().next().value).toEqual([ 'gmail', 'abc123' ]);
    } catch (e) {
      expect(e).toBeNull();
    }
  });
});
