import * as s from '..';
import { setup } from '../../lib';

describe('store -> encrypt', () => {
  test('returns data', async () => {
    try {
      await setup.before();

      const a: string = await s.encrypt(new Map());
      const b: string = await s.encrypt(new Map([ [ 'gmail', 'abc123' ] ]));
      expect(a.length).toBeGreaterThan(0);
      expect(b.length).toBeGreaterThan(0);

      await setup.after();
    } catch (e) {
      expect(e).toBeNull();
    }
  });
});
