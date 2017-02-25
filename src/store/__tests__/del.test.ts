import { expect } from 'chai';
import * as s from '..';
import { setup } from '../../lib';
import { b, green, r, red } from '../../lib/formatters';

describe('store -> del', () => {
  beforeEach(async () => await setup.before());
  afterEach(async () => await setup.after());

  it('deletes items from the store', async () => {

    const store = await s.open();

    store.set('gmail', 'abc123');
    await s.close(store);
    expect([ ...(await s.open()).entries() ]).to.eql([ ...store.entries() ]);

    store.set('facebook', '123abc');
    await s.close(store);
    expect([ ...(await s.open()).entries() ]).to.eql([ ...store.entries() ]);

    const deleted = await s.del('facebook');
    store.delete('facebook');
    expect([ ...(await s.open()).entries() ]).to.eql([ ...store.entries() ]);

    expect(deleted).to.equal(`Deleted ${b}${green}facebook${r} from the store`);

  });

  it('alerts the user if an item is not present in the store', async () => {

    const rejected = await s.del('asdf');
    expect(rejected).to.equal(`${b}${red}asdf not in the store${r}`);

  });
});
