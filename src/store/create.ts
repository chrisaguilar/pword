import { writeFile } from 'fs-promise';

import * as s from '.';

export const create = async function () {
  try {

    return writeFile(s.file, await s.encrypt(new Map()), 'hex');

  } catch (e) {
    return console.error(e) as any;
  }
};
