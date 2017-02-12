import { randomBytes as rand } from 'crypto';
import { writeFileSync as write } from 'fs';

import keyfile from './location';

export default () => write(keyfile, rand(2000000).toString('hex'), 'utf8');
