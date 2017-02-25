import { expect } from 'chai';
import { remove, writeFile } from 'fs-promise';

import * as k from '..';
import { rand, setup } from '../../lib';

describe('key -> open', () => {
  beforeEach(async () => await setup.before());
  afterEach(async () => await setup.after());

  it('opens the key file', async () => {

    await remove(k.file);
    await writeFile(k.file, await rand(24), 'hex');

    const testkey: string = await k.open();
    expect(testkey.length).to.equal(24);

  });
});
