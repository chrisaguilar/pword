import { randomBytes } from 'crypto';
import { writeFile as write } from 'fs-promise';

import { keyfile, rand } from '.';

export const create = async function create(): Promise<void> {
  try {
    return write(keyfile, (await rand()).toString('hex'), 'hex');
  } catch (e) {
    throw e;
  }
};
