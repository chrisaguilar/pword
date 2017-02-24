import { writeFile as write } from 'fs-promise';

import * as k from '.';
import { rand } from '../lib';

interface Create {
  (): Promise<void>;
}

export const create: Create = async function() {
  try {
    const key: string = await rand(Math.floor(Math.random() * (100 - 26) + 26));
    return write(k.file, key, 'hex');
  } catch (e) {
    return console.error(e) as any;
  }
};
