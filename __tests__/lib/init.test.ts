import { readFile, remove } from 'fs-promise';

import * as k from 'key';
import * as s from 'store';
import * as setup from '../setup';

describe('lib -> init', () => {
  test('creates key and store', async () => {
    try {
      await setup.before();
      const teststore = await(s.encrypt(new Map()));
      const keyfile = await readFile(k.file, 'hex');
      const storefile = await readFile(s.file, 'hex');
      expect(keyfile).toBeTruthy();
      expect(typeof keyfile).toBe('string');
      expect(keyfile.length).toBeGreaterThanOrEqual(24);
      expect(keyfile.length).toBeLessThan(100);
      expect(storefile).toBeTruthy();
      expect(typeof storefile).toBe('string');
      expect(storefile.length).toBe(teststore.length);
      expect(storefile).toBe(teststore);
      await setup.after();
    } catch (e) {
      expect(e).toBeNull();
    }
  });
});
