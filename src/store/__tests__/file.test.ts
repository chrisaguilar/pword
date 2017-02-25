import { expect } from 'chai';

import { homedir } from 'os';
import { resolve } from 'path';

import * as s from '..';

describe('store -> file', () => {
  it('should be a string', () => expect(typeof s.file).to.equal('string'));

  const path = resolve(homedir(), '.pword/store');
  it('should point to the correct location', () => expect(path).to.equal(s.file));
});
