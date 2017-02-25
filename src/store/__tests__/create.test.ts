import { expect } from 'chai';
import { readFile } from 'fs-promise';

import * as s from '..';
import { setup } from '../../lib';

describe('store -> create', () => {
  beforeEach(async () => await setup.before());
  afterEach(async () => await setup.after());

  it('uses key to write a new map to the store file', async () => {

    const map = await s.encrypt(new Map());
    const store = await readFile(s.file, 'hex');
    expect(map).to.equal(store);

  });
});
