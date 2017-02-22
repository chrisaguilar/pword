import { writeFile as write } from 'fs-promise';

import { encrypt, file } from 'store';

export const create = async function create() {
  try {
    return write(file, (await encrypt(new Map()) as string), 'hex');
  } catch (e) {
    return console.error(e);
  }
};
