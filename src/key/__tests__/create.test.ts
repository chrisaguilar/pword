import { expect } from 'chai';
import { readFile, remove } from 'fs-promise';

import * as k from '..';
import { setup } from '../../lib';

describe('key -> create', () => {
  beforeEach(async () => await setup.before());
  afterEach(async () => await setup.after());

  it('writes 25..100 random characters to a file', async () => {

    await remove(k.file);
    await k.create();
    const testkey: string = await readFile(k.file, 'hex');
    expect(testkey.length).to.be.at.least(25);
    expect(testkey.length).to.be.below(100);

  });
});
