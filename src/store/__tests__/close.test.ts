import { expect } from 'chai';

import * as s from '..';
import { setup } from '../../lib';

describe('store -> close', () => {
  beforeEach(async () => await setup.before());
  afterEach(async () => await setup.after());

  it('writes given data to the store', async () => {

    const store = await s.open();

    store.set('facebook', 'facebook_pass');
    await s.close(store);

    expect((await s.open()).has('facebook')).to.be.ok;
    expect((await s.open()).get('facebook')).to.equal('facebook_pass');

    store.set('gmail', 'gmail_pass');
    await s.close(store);

    const newstore = await s.open();
    expect(newstore.has('facebook')).to.be.ok;
    expect(newstore.has('gmail')).to.be.ok;
    expect(newstore.get('facebook')).to.equal('facebook_pass');
    expect(newstore.get('gmail')).to.equal('gmail_pass');

  });
});
