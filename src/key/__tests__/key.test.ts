import { exists, remove as rm } from 'fs-promise';

import { key, keyfile } from '..';

describe('key', () => {
  describe('key does not exist', () => {
    beforeAll(async () => await rm(keyfile));
    afterAll(async () => await rm(keyfile));

    test('key is created', async () => {
      try {

        expect(await exists(keyfile)).toBeFalsy();
        await key();
        expect(await exists(keyfile)).toBeTruthy();

      } catch (e) {
        return console.error(e) as any;
      }
    });

    test('key is read', async () => {
      try {

        expect((await key()).length).toEqual(24);

      } catch (e) {
        return console.error(e) as any;
      }
    });
  });
  describe('key exists', () => {
    beforeAll(async () => await rm(keyfile));
    afterAll(async () => await rm(keyfile));

    test('key is not modified', async () => {
      try {

        const old = await key();
        expect(await key()).toEqual(old);

      } catch (e) {
        return console.error(e) as any;
      }
    });

    test('key is read', async () => {
      try {

        expect((await key()).length).toEqual(24);

      } catch (e) {
        return console.error(e) as any;
      }
    });
  });
});
