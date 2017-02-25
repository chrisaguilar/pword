import { expect } from 'chai';

import * as s from '..';
import { setup } from '../../lib';
import { b, green, r, red } from '../../lib/formatters';

describe('store -> find', () => {
  beforeEach(async () => await setup.before());
  afterEach(async () => await setup.after());

  it('finds passwords that match a given RegEx', async () => {

    let store = await s.open();

    store.set('Outlook MaIl', 'abc123');
    store.set('gmail', 'gmailPass');
    store.set('facebook', 'notmymailpass');
    await s.close(store);

    const expected =
      [ ...store.entries() ]
        .filter(([ a, b ]) => /mail/i.test(a as string))
        .map(([ x, y ]) => `${b}${green}${x}${r}: ${y}`);

    expect(await s.find('mail')).to.eql(expected);

  });

  it('alerts the user if no items match the RegEx', async () => {

    expect(await s.find('youtube')).to.equal(`${b}${red}No matches found for youtube${r}`);

  });
});
