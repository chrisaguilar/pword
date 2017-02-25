import { expect } from 'chai';

import * as s from '..';
import { setup } from '../../lib';

describe('store -> decrypt', () => {
  beforeEach(async () => await setup.before());
  afterEach(async () => await setup.after());

  it('decrypts data', async () => {

    let encA = await s.encrypt(new Map());
    let encB = await s.encrypt(new Map([ [ 'gmail', 'abc123' ] ]));
    let decA = await s.decrypt(encA);
    let decB = await s.decrypt(encB);

    expect(decA).to.be.an.instanceof(Map);
    expect(decA.size).to.equal(0);
    expect(decB).to.be.an.instanceOf(Map);
    expect(decB.size).to.equal(1);
    expect(decA.entries().next().value).to.be.undefined;
    expect(decB.entries().next().value).to.eql([ 'gmail', 'abc123' ]);

  });
});
