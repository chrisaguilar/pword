import { randomBytes } from 'crypto';
import { writeFile as write } from 'fs-promise';

import { keyfile } from '.';
import { rand } from '../lib/rand';

export const create = async function create(): Promise<void> {
  try {

    return write(keyfile, await rand(24), 'hex');

  } catch (e) {
    return console.error(e) as any;
  }
};
