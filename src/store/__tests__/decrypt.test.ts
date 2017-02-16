import { decrypt, encrypt } from '..';

describe('store -> decrypt', () => {
  let encA: string;
  let encB: string;
  let decA: Map<{}, {}>;
  let decB: Map<{}, {}>;

  beforeAll(async () => {
    try {
      encA = await encrypt(new Map());
      encB = await encrypt(new Map([ [ 'gmail', 'abc123' ] ]));
    } catch (e) {
      throw e;
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
      throw e;
    }
  });

  test('properly decrypts data', async () => {
    try {
      decA = await decrypt(encA);
      decB = await decrypt(encB);
      expect(decA.entries().next().value).toBeUndefined();
      expect(decB.entries().next().value).toEqual([ 'gmail', 'abc123' ]);
    } catch (e) {
      throw e;
    }
  });
});
