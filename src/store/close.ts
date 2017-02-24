import { writeFile } from 'fs-promise';

import * as s from '.';

interface Close {
  (store: Map<{}, {}>): Promise<void>;
}

export const close: Close = async function (store) {
  try {

    return await writeFile(s.file, await s.encrypt(store), 'hex');

  } catch (e) {
    return console.error(e) as any;
  }
};
