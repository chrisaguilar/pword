import { writeFile } from 'fs-promise';

import * as s from '.';

export const create = async function () {
  try {

    const store = await s.encrypt(new Map());
    return writeFile(s.file, store, 'hex');

  } catch (e) {
    return console.error(e) as any;
  }
};
