import { expect } from 'chai';

import { help } from '..';

describe('help', () => {
  it('should return data', () => {
    expect(help()).to.exist;
    expect(help()).to.be.ok;
  });
  it('should return a string', () => {
    expect(help()).to.be.a('string');
    expect(help().length).to.be.greaterThan(0);
  });
});
