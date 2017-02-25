import { expect } from 'chai';
import * as s from '..';
import { setup } from '../../lib';
import { b, green, r, red } from '../../lib/formatters';

describe('store -> add', () => {
  beforeEach(async () => setup.before());
  afterEach(async () => setup.after());

  it('saves new password to store', async () => {
    const store = await s.open();

    store.set('gmail', 'abc123');
    await s.close(store);
    expect([ ...(await s.open()).entries() ]).to.eql([ ...store.entries() ]);

    const added = await s.add('facebook', '123abc');
    store.set('facebook', '123abc');
    expect([ ...(await s.open()).entries() ]).to.eql([ ...store.entries() ]);

    expect(added).to.equal(`${b}${green}facebook${r} set to ${b}${green}123abc${r}`);
  });

  it('rejects names already present', async () => {
    const store = await s.open();

    store.set('gmail', 'abc123');
    await s.close(store);
    expect([ ...(await s.open()).entries() ]).to.eql([ ...store.entries() ]);

    const rejected = await s.add('gmail', '123abc');
    store.set('gmail', '123abc');
    expect([ ...(await s.open()).entries() ]).to.not.eql([ ...store.entries() ]);
    expect(rejected).to.equal(`${b}${red}gmail already present in store${r}`);
  });
});
