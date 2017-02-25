import { expect } from 'chai';
import * as s from '..';
import { setup } from '../../lib';

describe('store -> encrypt', () => {
  beforeEach(async () => await setup.before());
  afterEach(async () => await setup.after());

  it('returns data', async () => {

      const a: string = await s.encrypt(new Map());
      const b: string = await s.encrypt(new Map([ [ 'gmail', 'abc123' ] ]));
      expect(a.length).to.be.greaterThan(0);
      expect(b.length).to.be.greaterThan(0);

  });
});
