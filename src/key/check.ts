import { existsSync as exists } from 'fs-extra';

import keyfile from './location';

export default () => exists(keyfile);
