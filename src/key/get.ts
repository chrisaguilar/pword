import { readFileSync as read } from 'fs';
import { resolve } from 'path';

import keyfile from './location';

export default () => read(keyfile, 'utf8');
