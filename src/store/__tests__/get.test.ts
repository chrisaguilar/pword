import { expect } from 'chai';

import * as s from '..';
import { setup } from '../../lib';
import { b, green, r, red } from '../../lib/formatters';

describe('store -> get', () => {
  beforeEach(async () => await setup.before());
  afterEach(async () => await setup.after());

  it('gets specified password from store', async () => {

    const store = await s.open();
    store.set('facebook', 'abc123');
    store.set('gmail', 'gmailPass');
    await s.close(store);

    expect(await s.get('facebook')).to.equal(`${b}${green}facebook${r}: abc123`);
    expect(await s.get('gmail')).to.equal(`${b}${green}gmail${r}: gmailPass`);

  });

  it('specified password does not exist', async () => {

    expect(await s.get('youtube')).to.equal(`${b}${red}youtube does not exist in store${r}`);

  });
});
