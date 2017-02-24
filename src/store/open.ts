import { readFile } from 'fs-promise';

import * as s from '.';

interface Open {
  (): Promise<Map<{}, {}>>;
}

export const open: Open = async function () {
  try {

    return await s.decrypt(await readFile(s.file, 'hex'));

  } catch (e) {
    return console.error(e) as any;
  }
};
