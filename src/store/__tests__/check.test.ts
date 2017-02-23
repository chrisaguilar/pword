import { ensureFile as touch, remove as rm } from 'fs-promise';

import { check, storefile } from '..';

describe('store -> check', () => {
  describe('store does not exist', () => {
    test('returns false', async () => {
      try {

        await rm(storefile);
        expect(await check()).toBeFalsy();

      } catch (e) {
        return console.error(e) as any;
      }
    });
  });

  describe('store exists', () => {
    test('returns true', async () => {
      try {

        await touch(storefile);
        expect(await check()).toBeTruthy();
        await rm(storefile);

      } catch (e) {
        return console.error(e) as any;
      }
    });
  });
});
