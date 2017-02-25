import { expect } from 'chai';
import * as s from '..';
import { setup } from '../../lib';


describe('store -> open', () => {
  beforeEach(async () => await setup.before());
  afterEach(async () => await setup.after());

  it('opens & decrypts store file', async () => {

      const store = await s.open();
      expect(store).to.exist;
      expect(store.size).to.equal(0);
      expect(store.entries().next().value).to.be.undefined;

  });
});
