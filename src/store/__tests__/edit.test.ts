import { expect } from 'chai';
import * as s from '..';
import { setup } from '../../lib';
import { b, green, r, red } from '../../lib/formatters';


describe('store -> edit', () => {
  beforeEach(async () => await setup.before());
  afterEach(async () => await setup.after());

  it('gives items new passwords', async () => {

    const store = await s.open();
    store.set('Outlook MaIl', 'abc123');
    store.set('gmail', 'gmailPass');
    store.set('facebook', 'notmymailpass');
    await s.close(store);

    const edited = await s.edit('facebook', 'newpass');
    store.set('facebook', 'newpass');

    expect([ ...(await s.open()).entries() ]).to.eql([ ...store.entries() ]);
    expect(edited).to.equal(`${b}${green}facebook${r} set to ${b}${green}newpass${r}`);

  });

  it('alerts user if the item does not exist in the store', async () => {

    const rejected = await s.edit('whatwhat', 'bzxcnbvxnvc');
    expect(rejected).to.equal(`${b}${red}whatwhat not in the store${r}`);

  });
});
