import { encrypt } from '..';

describe('store -> encrypt', () => {
  test('returns data', async () => {
    try {
      const a: string = await encrypt(new Map());
      const b: string = await encrypt(new Map([ [ 'gmail', 'abc123' ] ]));
      expect(a.length).toBeGreaterThan(0);
      expect(b.length).toBeGreaterThan(0);
    } catch (e) {
      throw e;
    }
  });
});
