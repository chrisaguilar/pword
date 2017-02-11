import { existsSync as exists } from 'fs-extra';
import { resolve } from 'path';

import keyfile from './location';

export default () => exists(keyfile);
