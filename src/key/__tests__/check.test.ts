import { ensureFile as touch, remove as rm } from 'fs-promise';

import { check, keyfile } from '..';

describe('key -> check', () => {
  describe('key does not exist', () => {
    test('returns false', async () => {
      try {

        await rm(keyfile);
        const exists: boolean = await check();
        expect(exists).toBeFalsy();

      } catch (e) {
        return console.error(e) as any;
      }
    });
  });

  describe('key exists', () => {
    test('returns true', async () => {
      try {

        await touch(keyfile);
        const exists: boolean = await check();
        expect(exists).toBeTruthy();
        await rm(keyfile);

      } catch (e) {
        return console.error(e) as any;
      }
    });
  });
});
