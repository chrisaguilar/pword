import { readFile } from 'fs-promise';

import { create, decrypt, file } from 'store';

export const open = async function open() {
  try {
    return await decrypt(await readFile(file, 'hex'));
  } catch (e) {
    return console.error(e);
  }
};
