import { expect } from 'chai';

import * as s from '..';
import { setup } from '../../lib';
import { b, green, r, red } from '../../lib/formatters';

describe('store -> new', () => {
  beforeEach(async () => await setup.before());
  afterEach(async () => await setup.after());

  it('saves a new, randomly-generated password of a given length to the store', async () => {

    await s.new(10, 'trello');
    expect(((await s.open()).get('trello') as string).length).to.equal(10);

    await s.new(50, 'wikipedia');
    expect(((await s.open()).get('wikipedia') as string).length).to.equal(50);

  });

  it('alerts the user if the specified name already exists in the store', async () => {

    await s.new(10, 'Steam');
    expect(await s.new(10, 'Steam')).to.equal(`${b}${red}Steam already present in store${r}`);

  });
});
