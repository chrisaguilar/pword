import { expect } from 'chai';
import * as s from '..';
import { setup } from '../../lib';
import { b, green, r, red } from '../../lib/formatters';

describe('store -> rename', () => {
  beforeEach(async () => await setup.before());
  afterEach(async () => await setup.after());

  it('renames an item', async () => {

    const store = await s.open();
    store.set('facebook', 'abc123');
    await s.close(store);

    await s.rename('facebook', 'fb');
    expect([ ...(await s.open()).entries() ]).not.eql([ ...(store).entries() ]);

    store.set('fb', store.get('facebook'));
    store.delete('facebook');

    expect([ ...(await s.open()).entries() ]).to.eql([ ...store.entries() ]);

    expect(await s.rename('fb', 'gmail')).to.equal(`Renamed ${b}${green}fb${r} to ${b}${green}gmail${r}`);

  });

  it('alerts the user if the item is not present in the store', async () => {

    expect(await s.rename('reddit', 'alienblue')).to.equal(`${b}${red}reddit not present in store${r}`);

  });
});
