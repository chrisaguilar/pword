import { expect } from 'chai';
import { homedir } from 'os';
import { resolve } from 'path';

import * as k from '..';

describe('key -> file', () => {
  it('should be a string', () => expect(typeof k.file).to.equal('string'));

  const path = resolve(homedir(), '.pword/key');
  it('should point to the correct location', () => expect(path).to.equal(k.file));
});
